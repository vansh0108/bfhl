const express = require("express");
const router = express.Router();
const { handleBFHL } = require("../controllers/bfhl.controller");

router.post("/", handleBFHL);

module.exports = router;
