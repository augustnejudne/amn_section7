const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes/routes');
const todosRoutes = require('../routes/todos.routes');
const usersRoutes = require('../routes/users.routes');
const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

require('../db/mongoose');

app.use(bodyParser.json());

routes(app);
todosRoutes(app);
usersRoutes(app);

app.listen(process.env.PORT, () => {
  console.log('========================');
  console.log('START HERE');
  console.log(`Listening on PORT ${process.env.PORT}`);
  console.log('========================');
});

module.exports = app;