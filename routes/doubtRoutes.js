const express = require("express");
const router = express.Router();
const doubtController = require("../controllers/doubtController");

router.post("/ask", doubtController.askDoubt);
router.post("/reply/:doubtId", doubtController.replyDoubt);

module.exports = router;