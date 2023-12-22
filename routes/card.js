const router = require("express").Router();
const csvDataController= require("../controllers/csvData")
const cardController = require("../controllers/card")
router.post("/saveCsvData", csvDataController.insertCsvData);
router.get("/get_card_status", cardController.getCardDetails);

module.exports = router;
