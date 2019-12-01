
//Config
const secret = "Wel";

//Server libs
const express = require('express');
const app = express();

//Additional libs
const news = require('./scripts/news/news-router');
const Logger = require('./scripts/logger/logger');
const pug = require('pug');
const compiledFunction = pug.compileFile('./scripts/pug/error.pug');
// const user = require('./scripts/models/User');
// const passport = require('./scripts/authentication/passport');

// parse application/json
app.use(express.json())

const logger = new Logger();

// app.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login'
// }));

app.use('/news', news)

app.use(function (err, req, res, next) {
    logger.logError(`Something broke! - ${err.message}`);
    res.status(500).send(compiledFunction({ statusCode: "500", errorMessage: `Something broke! - ${err.message}` }));
})
module.exports = app