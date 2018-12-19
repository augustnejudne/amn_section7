const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes/routes');
const app = express();

app.use(bodyParser.json());

require('../db/mongoose');

routes(app);

app.listen(3000, () => {
  console.log('Listening on PORT 3000');
});

module.exports = { app };