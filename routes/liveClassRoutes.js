const express = require("express");
const router = express.Router();
const liveController = require("../controllers/liveClassController");

router.post("/create", liveController.createLiveClass);
router.post("/join/:liveClassId", liveController.joinLiveClass);
router.post("/end/:liveClassId", liveController.endLiveClass);

module.exports = router;