const express = require("express");
const router = express.Router();
const { showFront } = require("../controllers/front");

router.get("/", showFront);

module.exports = router;
