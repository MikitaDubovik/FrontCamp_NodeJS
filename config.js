
//Config
const secret = "Wel";
exports.secret = secret;

//Server libs
const express = require('express');
const app = express();
var cors = require('cors')

//Additional libs
const news = require('./scripts/news/news-router');
const users = require('./scripts/users/users-router')
const Logger = require('./scripts/logger/logger');
const pug = require('pug');
const compiledFunction = pug.compileFile('./scripts/pug/error.pug');
require('./scripts/authentication/passport');
var passport = require('passport');

app.use(cors());

// parse application/json
app.use(express.json())

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

const logger = new Logger();

app.use('/', users);
app.use('/news', news)

app.use(function (err, req, res, next) {
    logger.logError(`Something broke! - ${err.message}`);
    if (err.name === "UnauthorizedError") {
        res.status(401).send(compiledFunction({ statusCode: "401", errorMessage: `You have to login first` }));
    }
    else {
        res.status(500).send(compiledFunction({ statusCode: "500", errorMessage: `Something broke! - ${err.message}` }));
    }
})

exports.app = app;