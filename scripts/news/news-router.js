var express = require('express')
var router = express.Router()

const pug = require('pug');
const compiledFunction = pug.compileFile('./scripts/pug/data.pug');

const News = require('./news').News;
const Logger = require('../logger/logger');

const logger = new Logger();

let newsList = [];
newsList.push(new News());
newsList.push(new News());

router.use(function timeLog(req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.logInfo(fullUrl, req.body);
    next();
})

router.get('/', (req, res) => {
    res.send(compiledFunction({ data: newsList }));
});

router.get('/:id', (req, res) => {
    res.send(compiledFunction({ data: newsList.filter(el => el.id == req.params.id) }));
});

router.post('/', (req, res) => {
    newsList.push(new News(...Object.values(req.body)));
    res.status(200).send("Added");
});

router.put('/:id', (req, res) => {
    let index = newsList.findIndex(el => el.id == req.params.id);

    newsList[index] = new News(...Object.values(req.body));

    res.status(200).send("Changed");
});

router.delete('/:id', (req, res) => {
    newsList = newsList.filter(el => el.id != req.params.id);
    res.status(200).send("Deleted");
});

module.exports = router