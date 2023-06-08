require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require('../backend/routers/authrouter');
const profileRouter = require('../backend/routers/profilerouter');
const app = express();
const PORT = process.env.REACT_APP_PORT;
const URI = process.env.REACT_APP_MONGO_URI;
const SECRET = process.env.REACT_APP_SESSION_SECRET;

app.use(require('express-session')({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  }));

app.use("/auth", authRouter);
app.use("/profile", profileRouter);

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


