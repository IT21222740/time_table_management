const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDB();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/faculty", require("./routes/facultyCourseRoutes"));
app.use("/api/resources", require("./routes/resourceRoute"));
app.use("/api/class-session", require("./routes/classSessionRoute"));
app.use("/api/student", require("./routes/studentRoute"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
