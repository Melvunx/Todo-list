const express = require("express");
const router = express.Router();
const { toggleStatus } = require("../controller/status.controller");

router.patch("/:id", toggleStatus);

module.exports = router;
