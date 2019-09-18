
const dal = require("../dal/dal");

async function getAllBids(){
    try{
            const sql = `SELECT raw_data, seq_id, customer, sequence, location, number, date FROM bid` 
            const AllBidsArr = await dal.execute(sql);

        return AllBidsArr;
    }
    catch(e){
        return e;
    }
  
}

async function getBidsByCustomer(customerName){
    try{
            const sql = `SELECT raw_data, seq_id, customer, UPPER(sequence) as sequence, location, number, date FROM bid WHERE customer = '${customerName}' ORDER BY STR_TO_DATE(date, '%d/%m/%Y') DESC` 
            const BidsArr = await dal.execute(sql);

        return BidsArr;
    }
    catch(e){
        return e;
    }
  
}

async function getCountOfAllBids(){
    try{
            const sql = `SELECT COUNT(*) as countAllBids FROM bid` 
            const bidsCount = await dal.execute(sql);

        return bidsCount;
    }
    catch(e){
        return e;
    }
  
}

module.exports = {
    getAllBids,
    getBidsByCustomer,
    getCountOfAllBids
}