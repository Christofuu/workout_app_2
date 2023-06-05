import express from 'express';
import session from 'express-session';
import passport from 'passport-google-oauth20';

const app = express();



app.use(
    session({
    secret: 'unga bunga',
    resave: false,
    saveUnintialized: false,
    cookie: {
         secure: true,
         maxAge: 1000 * 60 * 60 * 24 * 7
    }
})
);

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenicate with Google</a>')
});

app.get('/auth/google',
    passport.authenticate('google')
);

app.get('/auth/google/callback', 
  passport.authenticate('google', {
    sucessRedirect: '/protected', 
    failureRedirect: '/login' 
}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/protected', isLoggedIn, (req, res) => {
    res.send('Hello!');
});
