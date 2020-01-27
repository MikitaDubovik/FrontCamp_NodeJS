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

router.get('/', (req, res, next) => {
    News.find(function (err, result) {
        if (err) {
            return next(err);
        }

        res.status(200).send(result);
    });
});

router.get('/:id', (req, res, next) => {
    News.findById(req.params.id, function (err, result) {
        if (err) {
            return next(err);
        }

        res.status(200).send(baseCompiledFunction({ val: result }));
    });
});

router.get('/title/:title', (req, res, next) => {
    News.findOne({ title: req.params.title }, function (err, result) {
        if (err) {
            return next(err);
        }

        res.status(200).send(result);
    });
});

router.post('/', (req, res, next) => {
    let news = new News(req.body);
    news.publishedAt = Date.now();
    news.save(function (err) {
        if (err) {
            next(err);
        }

        res.status(201).send();
    })
});

router.put('/:id', auth.required, (req, res, next) => {
    News.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, result) {
        if (err) {
            return next(err);
        }

        if (result) {
            res.status(200).send();
        }
        else {
            res.status(404).send(errorCompiledFunction({ statusCode: "404", errorMessage: `Can't find news with id - ${req.params.id}` }));
        }
    });
});

router.put('/title/:title', (req, res, next) => {
    News.findOneAndUpdate({ title: req.params.title }, { $set: req.body }, function (err, result) {
        if (err) {
            return next(err);
        }

        if (result) {
            res.status(200).send();
        }
        else {
            res.status(404).send(errorCompiledFunction({ statusCode: "404", errorMessage: `Can't find news with title - ${req.params.id}` }));
        }
    });
});

router.delete('/:id', auth.required, (req, res, next) => {
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

router.delete('/title/:title', (req, res, next) => {
    News.findOneAndDelete({ title: req.params.title }, function (err, result) {
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