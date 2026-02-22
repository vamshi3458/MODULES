require("dotenv").config();
const express = require("express");
const cron = require("node-cron");
const cors = require("cors");
const db = require("./config/db");
const liveRoutes = require("./routes/liveClassRoutes");

const doubtRoutes = require("./routes/doubtRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/doubts", doubtRoutes);
app.use("/api/live", liveRoutes);

// Auto expire job
cron.schedule("0 * * * *", async () => {
  await db.execute(
    `UPDATE doubts 
     SET status = 'expired'
     WHERE status = 'pending'
     AND reply_deadline < NOW()`
  );
  console.log("Expired doubts updated");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});