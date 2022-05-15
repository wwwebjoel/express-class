const express = require("express");
const router = express.Router();

const { homeGet } = require("../controllers.js/home");

router.get("/", homeGet);

module.exports = router;
