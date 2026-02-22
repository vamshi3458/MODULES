const db = require("../config/db");

// Create live class
exports.createLiveClass = async (lectureId, teacherId, title, roomId) => {
  const [result] = await db.execute(
    `INSERT INTO live_classes 
     (lecture_id, teacher_id, title, room_id, status)
     VALUES (?, ?, ?, ?, 'live')`,
    [lectureId, teacherId, title, roomId]
  );

  return result.insertId;
};

// Get live class by id
exports.getLiveClassById = async (id) => {
  const [rows] = await db.execute(
    "SELECT * FROM live_classes WHERE id = ?",
    [id]
  );
  return rows[0];
};

// End live class
exports.endLiveClass = async (id) => {
  await db.execute(
    "UPDATE live_classes SET status = 'ended' WHERE id = ?",
    [id]
  );
};

// Add participant
exports.addParticipant = async (liveClassId, userId) => {
  await db.execute(
    `INSERT INTO live_class_participants
     (live_class_id, user_id)
     VALUES (?, ?)`,
    [liveClassId, userId]
  );
};