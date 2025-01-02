//imports
const express = require("express");
const app = express();
// const { connection } = require("./configs/db");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);

//port
const PORT = process.env.port || 8080;

//routes imports
const adminRouter = require("./routes/Admins.Route");
const studentRouter = require("./routes/Student.Route");
const tutorRouter = require("./routes/Tutor.Route");
const quizRouter = require("./routes/Quiz.Route");
const contentRouter = require("./routes/Content.Route");
const DoubtRouter = require("./routes/Doubt.Route");
const DashboardRouter = require("./routes/Dashboard.Route");
const DB_URI = process.env.DB_URI;
// app.use(express.text());
app.use(express.json());
app.use(cors());
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("DataBase is connected--->");
  })
  .catch((err) => {
    console.log("err------>", err);
  });
//routes
app.get("/", (req, res) => {
  res.send("Home Route");
});
app.use("/admin", adminRouter);
app.use("/tutor", tutorRouter);
app.use("/student", studentRouter);
app.use("/quiz", quizRouter);
app.use("/content", contentRouter);
app.use("/doubt", DoubtRouter);
app.use("/dashboard", DashboardRouter);

//app listening
app.listen(PORT, () => {
  console.log("Server is running on Port 3000");
});
