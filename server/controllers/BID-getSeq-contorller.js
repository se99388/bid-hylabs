const bidGetSeqLogic = require("../bll/BID-getSeq-logic");
const express = require("express");

const router = express.Router();



router.get("/allBids", async (request, response) => {
    try {
        const allBidsResponse = await bidGetSeqLogic.getAllBids();
        response.json(allBidsResponse)
    }
    catch (e) {
        response.status(500).json(e)
    }

});

router.get("/countOfAllBids", async (request, response) => {
    try {
        const countOfAllBidsResponse = await bidGetSeqLogic.getCountOfAllBids();
        response.json(countOfAllBidsResponse)
    }
    catch (e) {
        response.status(500).json(e)
    }

});

router.get("/bidsByCustomer/:customer", async (request, response) => {
    try {
        console.log("/bidsByCustomer/:customer")
        const allBidsResponse = await bidGetSeqLogic.getBidsByCustomer(request.params.customer);
        response.json(allBidsResponse)
    }
    catch (e) {
        response.status(500).json(e)
    }

});

module.exports = router;