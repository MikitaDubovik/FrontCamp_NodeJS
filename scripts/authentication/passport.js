var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.use(new GoogleStrategy({
    clientID: "361472549358-born02fo06qipm4jmcljdsvgrcte55v8.apps.googleusercontent.com",
    clientSecret: "jIdso6gCAOiulTxlRumzEX-c",
    callbackURL: 'http://localhost:3000/auth/google/return'
},
    function (accessToken, refreshToken, profile, cb) {
        User.find({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));