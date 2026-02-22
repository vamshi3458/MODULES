const liveService = require("../services/liveClassService");
const crypto = require("crypto");

// Teacher creates live class
exports.createLiveClass = async (req, res) => {
  try {
    const { lectureId, teacherId, title } = req.body;

    if (!lectureId || !teacherId || !title)
      return res.status(400).json({ message: "Missing required fields" });

    // Generate unique Jitsi room ID
    const roomId = "live_" + crypto.randomBytes(6).toString("hex");

    const liveClassId = await liveService.createLiveClass(
      lectureId,
      teacherId,
      title,
      roomId
    );

    res.status(201).json({
      message: "Live class created",
      liveClassId,
      roomId
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Student joins live class
exports.joinLiveClass = async (req, res) => {
  try {
    const { liveClassId } = req.params;
    const { userId } = req.body;

    const liveClass = await liveService.getLiveClassById(liveClassId);

    if (!liveClass)
      return res.status(404).json({ message: "Live class not found" });

    if (liveClass.status !== "live")
      return res.status(400).json({ message: "Live class not active" });

    await liveService.addParticipant(liveClassId, userId);

    res.json({
      message: "Joined successfully",
      roomId: liveClass.room_id
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// End class
exports.endLiveClass = async (req, res) => {
  try {
    const { liveClassId } = req.params;

    await liveService.endLiveClass(liveClassId);

    res.json({ message: "Live class ended" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};