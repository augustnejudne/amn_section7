const authenticate = require('../middleware/authenticate');
const {
  postUsers,
  postUsersLogin,
  getUsersMe,
  deleteUsersMe
} = require('./controllers/usersController');

module.exports = app => {
  app.post('/users', postUsers);
  app.post('/users/login', postUsersLogin);
  app.get('/users/me', authenticate, getUsersMe);
  app.delete('/users/me/token', authenticate, deleteUsersMe);
};
