const express = require('express');
const app = express();
const port = 3000;
const HttpClient = require('./scripts/http-service/http-client').HttpClient;
const LoggerProxy = require('./scripts/logger-proxy/logger-proxy').LoggerProxy;

var loggerProxy = new LoggerProxy(new HttpClient());

app.get('/news', async (req, res) => {
    var data = await loggerProxy.get(`v1/articles?source=bbc-news`);
    res.send(data);
});

app.get('/news/:id', async (req, res) => {
    var data = await loggerProxy.get(`v1/articles?source=${req.params.id}`);
    res.send(data);
});

app.post('/news', async (req, res) {
    res.send('POST request to the news')
});

app.put('/news/:id', async (req, res) {
    res.send('PUT request to the news/id')
});

app.delete('/news/:id', async (req, res) {
    res.send('DELETE request to the news/id')
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));