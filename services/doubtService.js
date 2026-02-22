const db = require("../config/db");

// Get teacher from lecture
exports.getLectureTeacher = async (lectureId) => {
  const [rows] = await db.execute(
    "SELECT teacher_id FROM lectures WHERE id = ?",
    [lectureId]
  );
  return rows[0];
};

// Create doubt
exports.createDoubt = async (lectureId, studentId, teacherId, question) => {
  const deadline = new Date();
  deadline.setHours(deadline.getHours() + 24);

  const [result] = await db.execute(
    `INSERT INTO doubts 
     (lecture_id, student_id, teacher_id, question, reply_deadline)
     VALUES (?, ?, ?, ?, ?)`,
    [lectureId, studentId, teacherId, question, deadline]
  );

  return result.insertId;
};

// Get doubt
exports.getDoubtById = async (doubtId) => {
  const [rows] = await db.execute(
    "SELECT * FROM doubts WHERE id = ?",
    [doubtId]
  );
  return rows[0];
};

// Add reply
exports.addReply = async (doubtId, teacherId, replyText) => {
  const [result] = await db.execute(
    `INSERT INTO doubt_replies (doubt_id, teacher_id, reply)
     VALUES (?, ?, ?)`,
    [doubtId, teacherId, replyText]
  );

  await db.execute(
    "UPDATE doubts SET status = 'replied' WHERE id = ?",
    [doubtId]
  );

  return result.insertId;
};

// Save attachment
exports.saveAttachment = async (doubtId, replyId, fileName, filePath) => {
  await db.execute(
    `INSERT INTO doubt_attachments
     (doubt_id, reply_id, file_name, file_path)
     VALUES (?, ?, ?, ?)`,
    [doubtId, replyId, fileName, filePath]
  );
};