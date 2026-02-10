const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.status(501).json({
    is_success: false,
    error: "Not implemented yet"
  });
});

module.exports = router;
