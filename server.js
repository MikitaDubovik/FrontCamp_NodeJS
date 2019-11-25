const express = require('express');
const news = require('./scripts/news/news-router');
const app = express();
var bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());


app.use('/news', news)

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(`Something broke! - ${err.message}`);
})

app.listen(port, () => console.log(`Server listening on port ${port}!`));