var express = require('express')
var router = express.Router()

const pug = require('pug');
const compiledFunction = pug.compileFile('./scripts/pug/template.pug');

const News = require('./news').News;

let newsList = [];
newsList.push(new News());
newsList.push(new News());

router.use(function timeLog(req, res, next) {
    next();
})

router.get('/', (req, res) => {
    res.send(compiledFunction({ data: newsList }));
});

router.get('/:id', (req, res, next) => {
    res.send(compiledFunction({ data: newsList.filter(el => el.id == req.params.id) }));
});

router.post('/', (req, res) => {
    newsList.push(new News(req.body));
});

router.put('/:id', (req, res) => {
    let index = newsList.findIndex(el => el.id == req.params.id);

    newsList[index] = req.body;
});

router.delete('/:id', (req, res) => {
    newsList = newsList.filter(el => el.id != req.params.id);
});

module.exports = router