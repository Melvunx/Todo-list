const express = require("express");
const router = express.Router();
const { toggleImportant } = require("../controller/important.controller");

router.patch("/:id", toggleImportant);

module.exports = router;
