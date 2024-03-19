const express = require('express');
const dotenv = require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use("/api/courses", require("./routes/courseRoutes"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


