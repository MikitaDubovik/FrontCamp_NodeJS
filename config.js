
//Config
const secret = "Wel";
exports.secret = secret;

//Server libs
const express = require('express');
const app = express();

//Additional libs
const news = require('./scripts/news/news-router');
const users = require('./scripts/users/users-router')
const Logger = require('./scripts/logger/logger');
const pug = require('pug');
const compiledFunction = pug.compileFile('./scripts/pug/error.pug');

// parse application/json
app.use(express.json())

const logger = new Logger();

app.use('/', users);
app.use('/news', news)

app.use(function (err, req, res, next) {
    logger.logError(`Something broke! - ${err.message}`);
    res.status(500).send(compiledFunction({ statusCode: "500", errorMessage: `Something broke! - ${err.message}` }));
})

exports.app = app;