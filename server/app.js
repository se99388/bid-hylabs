const BidReadFileController = require("./controllers/BID-readFile-contoller");
const BidGetSeqContorller = require("./controllers/BID-getSeq-contorller");
const BidGetCustomersContorller = require("./controllers/BID-getCustomers-contorller");
const seqAnalysisContorller = require("./controllers/seqAnalysis-controller");

const express = require("express");
const cors = require("cors");
const server = express();

server.use(cors());
server.use(express.json());
server.use("/api/bid",BidGetSeqContorller);
server.use("/api/bid",BidGetCustomersContorller);
server.use("/api/bid",seqAnalysisContorller);



server.get("*", async (request, response)=>{
    response.status(404).json({message: "route not found"});
})
//Read bid files form BID directory
// BidReadFileController.executeReadBidFiles();

server.listen(3000,()=>{
console.log("We are listening to http://172.21.3.46:3000");
});

