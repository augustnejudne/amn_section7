const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes/routes');
const app = express();

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

require('../db/mongoose');

app.use(bodyParser.json());

routes(app);

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${process.env.PORT}`);
});

module.exports = { app };