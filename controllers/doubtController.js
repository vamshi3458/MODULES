const doubtService = require("../services/doubtService");

// Ask doubt
exports.askDoubt = async (req, res) => {
  try {
    const { lectureId, studentId, question } = req.body;

    const lecture = await doubtService.getLectureTeacher(lectureId);

    if (!lecture)
      return res.status(404).json({ message: "Lecture not found" });

    const doubtId = await doubtService.createDoubt(
      lectureId,
      studentId,
      lecture.teacher_id,
      question
    );

    res.status(201).json({ message: "Doubt created", doubtId });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reply doubt
exports.replyDoubt = async (req, res) => {
  try {
    const { doubtId } = req.params;
    const { teacherId, reply } = req.body;

    const doubt = await doubtService.getDoubtById(doubtId);

    if (!doubt)
      return res.status(404).json({ message: "Doubt not found" });

    if (doubt.teacher_id !== teacherId)
      return res.status(403).json({ message: "Unauthorized" });

    if (new Date() > new Date(doubt.reply_deadline))
      return res.status(400).json({ message: "Reply deadline exceeded" });

    const replyId = await doubtService.addReply(
      doubtId,
      teacherId,
      reply
    );

    res.json({ message: "Reply added", replyId });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};