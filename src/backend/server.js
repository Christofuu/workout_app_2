require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const authrouter = require('../backend/routers/authrouter');
const app = express();
const PORT = process.env.REACT_APP_PORT;
const URI = process.env.REACT_APP_MONGO_URI;

app.use("/auth", authrouter);

mongoose.connect(URI, {
    useNewUrlParser: true
})
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err));

app.get("/", function (req, res) {
    res.send("Hello World");
});

app.listen(PORT, function () {
    console.log("listening on port " + PORT);
});

