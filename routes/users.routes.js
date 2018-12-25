const {
  postUsers,
} = require('./controllers/users.controller');

module.exports = app => {
  app.post('/users', postUsers);
};
