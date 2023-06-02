import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
const app = express();
const PORT = process.env.REACT_APP_PORT;
const URI = process.env.REACT_APP_MONGO_URI;

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

