const authenticate = require('../middleware/authenticate');
const {
  postUsers,
  postUsersLogin,
  getUsersMe,
  minitests
} = require('./controllers/users.controller');

module.exports = app => {
  app.post('/users', postUsers);
  app.post('/users/login', postUsersLogin);
  app.get('/users/me',authenticate, getUsersMe),
  app.post('/minitests', minitests);
};
