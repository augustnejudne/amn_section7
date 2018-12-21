const { index } = require('./controllers/controllers');


module.exports = app => {
  app.get('/', index);
};
