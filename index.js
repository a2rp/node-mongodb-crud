require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const user = require("./api/routes/user.routes");
app.use(user);

mongoose.connect(process.env.MONGODB_LOCAL_URL);
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => {
    console.log("connected to database");
    const PORT = 1198;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});

module.exports = app;
