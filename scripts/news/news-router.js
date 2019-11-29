var express = require('express')
var router = express.Router()

const pug = require('pug');
const dataCompiledFunction = pug.compileFile('./scripts/pug/data.pug');
const errorCompiledFunction = pug.compileFile('./scripts/pug/error.pug');

const News = require('./news').News;
const Logger = require('../logger/logger');

const logger = new Logger();

let newsList = [];
let obj1 = { id: "1", author: "author1", title: "title1", publishedAt: "publishedAt1" }
let obj2 = { id: "2", author: "author2", title: "title2", publishedAt: "publishedAt2" }

newsList.push(new News(obj1));
newsList.push(new News(obj2));
router.use((req, res, next) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.logInfo(fullUrl, req.body);
    next();
})

router.get('/', (req, res) => {
    if (newsList.length !== 0) {
        res.status(200).send(dataCompiledFunction({ data: newsList }));
    } else {
        res.status(404).send(errorCompiledFunction({ statusCode: "404", errorMessage: `No any news` }));
    }
});

router.get('/:id', (req, res) => {
    let result = newsList.filter(el => el.id == req.params.id);
    if (result.length !== 0) {
        res.status(200).send(dataCompiledFunction({ data: result }));
    } else {
        res.status(404).send(errorCompiledFunction({ statusCode: "404", errorMessage: `Can't find news with id - ${req.params.id}` }));
    }
});

router.post('/', (req, res) => {
    newsList.push(new News(req.body));
    res.status(201).send();
});

router.put('/:id', (req, res) => {
    let index = newsList.findIndex(el => el.id == req.params.id);

    if (index !== -1) {
        newsList[index] = new News(req.body);
        res.status(200).send();
    }
    else {
        res.status(404).send(errorCompiledFunction({ statusCode: "404", errorMessage: `Can't find news with id - ${req.params.id}` }));
    }
});

router.delete('/:id', (req, res) => {
    let firstLength = newsList.length;
    newsList = newsList.filter(el => el.id != req.params.id);
    let secondLength = newsList.length;

    if (firstLength !== secondLength) {
        res.status(200).send();
    }
    else {
        res.status(404).send(errorCompiledFunction({ statusCode: "404", errorMessage: `Can't find news with id - ${req.params.id}` }));
    }
});

module.exports = router