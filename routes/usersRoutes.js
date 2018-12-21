const authenticate = require('../middleware/authenticate');
const {
  usersPost,
  usersGetMe
} = require('./controllers/usersController');

module.exports = app => {
  app.post('/users', usersPost);
  app.get('/users/me', authenticate, usersGetMe);
};
