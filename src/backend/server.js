require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo');
const app = express();
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');


const authRouter = require('../backend/routers/authrouter');
const profileRouter = require('../backend/routers/profilerouter');
const PORT = process.env.REACT_APP_PORT;
const URI = process.env.REACT_APP_MONGO_URI;
const SECRET = process.env.REACT_APP_SESSION_SECRET;
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccesStatus: 200,
}

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.options('*', cors({ origin: 'http://localhost:3000', optionsSuccesStatus: 200}));
app.use(cors(corsOptions))
app.use(session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: URI
    })
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));


mongoose.connect(URI, {
    useNewUrlParser: true
})
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err));

app.use('/auth', authRouter);
app.use('/profile', profileRouter);

app.post('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    console.log(req.user)
  });
});

app.get("/", function (req, res) {
    if (!req.user) {
        res.send("Hello world");
    }
    else {
        res.send(req.user.username);
    }
});

app.listen(PORT, function () {
    console.log("listening on port " + PORT);
});


