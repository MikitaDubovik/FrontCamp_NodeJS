const express = require('express');
const app = express();
const port = 3000;
const HttpClient = require('./scripts/http-service/http-client').HttpClient;
const LoggerProxy = require('./scripts/logger-proxy/logger-proxy').LoggerProxy;

var loggerProxy = new LoggerProxy(new HttpClient());

app.get('/news', (req, res) => {
    res.send(loggerProxy.get())
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));