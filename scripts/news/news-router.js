let express = require('express')
let router = express.Router()

const pug = require('pug');
const baseCompiledFunction = pug.compileFile('./scripts/pug/base-presentation.pug');
const dataCompiledFunction = pug.compileFile('./scripts/pug/data.pug');
const errorCompiledFunction = pug.compileFile('./scripts/pug/error.pug');

const auth = require('../authentication/auth');

//mongoose
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/news', { useNewUrlParser: true });

const News = require('../models/news').News;
const Logger = require('../logger/logger');

const logger = new Logger();

router.use((req, res, next) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.logInfo(fullUrl, req.body);
    next();
})

router.get('/', (req, res) => {
    News.find(function (err, result) {
        if (err) {
            return next(err);
        }

        if (result.length !== 0) {
            res.status(200).send(dataCompiledFunction({ data: result }));
        } else {
            res.status(404).send(errorCompiledFunction({ statusCode: "404", errorMessage: `No any news` }));
        }
    });
});

router.get('/:id', (req, res) => {
    News.findById(req.params.id, function (err, result) {
        if (err) {
            return next(err);
        }

        if (result) {
            res.status(200).send(baseCompiledFunction({ val: result }));
        } else {
            res.status(404).send(errorCompiledFunction({ statusCode: "404", errorMessage: `No any news` }));
        }
    });
});

router.post('/', (req, res) => {
    let news = new News(req.body);
    news.save(function (err) {
        if (err) {
            next(err);
        }

        res.status(201).send();
    })
});

router.put('/:id', auth.required, (req, res) => {
    News.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, result) {
        if (err) {
            console.log(err);
        }

        if (result) {
            res.status(200).send();
        }

        res.status(404).send(errorCompiledFunction({ statusCode: "404", errorMessage: `Can't find news with id - ${req.params.id}` }));
    });
});

router.delete('/:id', auth.required, (req, res) => {
    News.findByIdAndDelete(req.params.id, function (err, result) {
        if (err) {
            return next(err);
        }

        if (result) {
            res.status(200).send();
        } else {
            res.status(404).send(errorCompiledFunction({ statusCode: "404", errorMessage: `No any news` }));
        }
    });
});

module.exports = router;