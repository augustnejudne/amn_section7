const authenticate = require('../middleware/authenticate');
const {
  postUsers,
  postUsersLogin,
  getUsersMe
} = require('./controllers/usersController');

module.exports = app => {
  app.post('/users', postUsers);
  app.post('/users/login', postUsersLogin);
  app.get('/users/me', authenticate, getUsersMe);
};
