
const fs = require("fs");
const path = require("path");
let allSeqArray = [];
const fsP = require("fs").promises;
const bidLogic = require("../bll/BID-logic");
const BidData = require("../models/bidData");

Date.prototype.toLocaleDateString = function () {
    return `${this.getDate()}/${this.getMonth() + 1}/${this.getFullYear()}`;
};

let geneNum = 0;


async function executeReadBidFiles() {
    try {
        // const dirName = "D:/ofir/BID/abic (fibro)";
        const dirName = "D:/ofir/BID";
        await crawl(dirName);
        const info = await bidLogic.addBid(allSeqArray);
        console.log("info", info);


    } catch (e) {
        console.log("Error", e)
    }

};


async function crawl(dir) {

    let files = await readFolder(dir);

    for (let x in files) {
        let next = path.join(dir, files[x]);

        const stat = await fsP.lstat(next);
        if (stat.isDirectory() == true) {
            console.log(next);
            await crawl(next);
        }
        else {

            if ((path.extname(next) == ".in" || path.extname(next) == ".seq")
                && path.basename(path.dirname(next)) !== "blast"
            ) {

                try {

                    const seqObj = await geneFunc(next);
                    if (seqObj) {
                        allSeqArray.push(seqObj);
                    }

                }
                catch (e) {
                    console.log("ErrorCatch", e)
                }
            }
        }
    }
}



//return files in folder according to a specific extention
function readFolder(folder) {
    return new Promise((resolve, reject) => {
        fs.readdir(folder, (err, files) => {
            if (err) {
                console.log("err", err);
                reject(err);
            }
            else {
                resolve(files);
            }
        });
    });

}

function newSplit(text, lineSplit) {
    if (lineSplit <= 0) return null;

    var index = -1;
    for (var i = 0; i < lineSplit; i++) {
        index = text.indexOf("\n", index) + 1;
        if (index === 0) return null;
    }

    return { 0: text.substring(0, index - 1), 1: text.substring(index) }
}

function mysql_real_escape_string(str) {
    return str.replace(/[\\]/g, function (char) {
        switch (char) {
            case "\"":
            case "\\":
                return "\\" + char; // prepends a backslash to backslash, percent,
            // and double/single quotes
        }
    });
}
// //split file content to object
async function geneFunc(myPath) {
    try {
        let str = await readFile(myPath);
        const res = newSplit(str, 1);
        const customerName = myPath.split(/BID\\/)[1].split(/\\{1}/)[0];
        if (seqNotExist(res[0], customerName, allSeqArray)) {
            if (!str.includes("<!DOCTYPE")) {
                geneNum++;
                const bidDataObj = new BidData();
                const fileDate = await getDateFile(myPath);
                bidDataObj.date = fileDate.toLocaleDateString('en-GB');

                str = mysql_real_escape_string(str);
                bidDataObj.rawData = str;

                bidDataObj.seqId = res[0];
                bidDataObj.sequence = res[1];


                if (bidDataObj.sequence) {
                    bidDataObj.sequence = bidDataObj.sequence.replace(/[\n\r]/g, "");
                }
                //to escape inserting "'" in MYSQL  
                myPath = myPath.replace("'", "\\'");
                bidDataObj.folder = myPath;
                bidDataObj.customer = customerName;
                bidDataObj.number = geneNum;
                return bidDataObj;
            }
            return false;
        }
        return false;



    }
    catch (e) {
        console.log("ERRORCATCH", e)
    }

}

function seqNotExist(seqId, customerName, allSeqArray) {

    let myReg = new RegExp(seqId + "(\\r)*")

    let prevSeqMatch = allSeqArray.filter(bidData => {
        return bidData.customer == customerName;
    }).find(obj => {
        return obj.seqId.match(myReg);
    });

    if (prevSeqMatch) {
        console.log("prevSeqMatch:"+ prevSeqMatch.seqId + "," + prevSeqMatch.customer + "!");
        return false;
    }
    return true;
}

function readFile(mypath) {
    return new Promise((resolve, reject) => {
        fs.readFile(mypath, "utf-8", (err, fileData) => {
            if (err) {
                console.log("Error", err);
                reject(err);
            } else {
                resolve(fileData);
            }
        });
    });

}

function getDateFile(mypath) {
    return new Promise((resolve, reject) => {
        fs.stat(mypath, function (err, stats) {
            if (err) {
                console.log("Error", err);
                reject(err);
            } else {
                resolve(stats.mtime);
            }
        });

    });
}

module.exports = {
    executeReadBidFiles
}

















