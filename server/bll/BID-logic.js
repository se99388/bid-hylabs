const dal = require("../dal/dal");

async function addBid(bidArray){
    try{
        for (bid of bidArray) {
            const sql = `insert into bidTrail(raw_data, seq_id, customer, sequence, location, number, date) values ('${bid.rawData}', '${bid.seqId}', '${bid.customer}', '${bid.sequence}', '${bid.folder}', ${bid.number}, '${bid.date}') `
            const info = await dal.execute(sql);
            bid.id = info.insertId;
        }
        return bidArray;
    }
    catch(e){
        return e;
    }
  
}

module.exports = {
    addBid
}