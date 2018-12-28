const {
  postUsers,
  // postUsersLogin
  minitests
} = require('./controllers/users.controller');

module.exports = app => {
  app.post('/users', postUsers);
  // app.post('/users/login', postUsersLogin);

  app.post('/minitests', minitests);
};
