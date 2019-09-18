const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "BID"
});

connection.connect(err=>{
    if(err) {
        console.log("Error", err);
        return;
    }
    console.log("We are connceted to MySQL");
});

function execute(sql) {
    return new Promise ((resolve, reject)=>{
        connection.query(sql,(err,result)=>{
            if (err){
                reject(err);
            }
            else{
                resolve(result);
            }
        });
    });
}

module.exports = {
    execute
}
