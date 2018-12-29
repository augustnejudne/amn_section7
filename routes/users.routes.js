const authenticate = require('../middleware/authenticate');
const {
  postUsers,
  postUsersLogin,
  getUsersMe,
  deleteUsersMeToken,
  minitests
} = require('./controllers/users.controller');

module.exports = app => {
  app.post('/users', postUsers);
  app.post('/users/login', postUsersLogin);
  app.get('/users/me',authenticate, getUsersMe),
  app.delete('/users/me/token', authenticate, deleteUsersMeToken),
  app.post('/minitests', minitests);
};
