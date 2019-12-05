const app = require('./config').app;
const port = 3000;

app.listen(port, () => console.log(`Server listening on port ${port}!`));