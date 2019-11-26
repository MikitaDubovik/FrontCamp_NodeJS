//Server libs
const express = require('express');
const app = express();

//Additional libs
const news = require('./scripts/news/news-router');
const Logger = require('./scripts/logger/logger');
const pug = require('pug');
const compiledFunction = pug.compileFile('./scripts/pug/error.pug');

// parse application/json
app.use(express.json())

const logger = new Logger();

app.use(function (err, req, res, next) {
    logger.logError(`Something broke! - ${err.message}`);
    res.status(500).send(compiledFunction({ errorMessage: `Something broke! - ${err.message}` }));
})

app.use('/news', news)

module.exports = app