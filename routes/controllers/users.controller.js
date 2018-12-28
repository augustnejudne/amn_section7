const _ = require('lodash');
const User = require('../../models/user.model');

///////////////
// POST USERS //
///////////////
const postUsers = (req, res) => {
  console.log('========================');
  console.log('POST /users');
  console.log('========================');
  const body = _.pick(req.body, ['email', 'password']);
  const newUser = new User(body);

  newUser
    .save()
    // .then(user => user.generateAuthToken())
    .then(user => {
      return user.generateAuthToken();
    })
    .then(token => res.header('x-auth', token).send(newUser))
    .catch(e => res.status(400).send(JSON.stringify(e.message, undefined, 2)));
};

//////////////////////
// POST USERS/LOGIN //
//////////////////////
const postUsersLogin = (req, res) => {
};

//////////////////
// GET USERS/ME //
//////////////////
const getUsersMe = (req, res) => {
  console.log('========================');
  console.log('GET /users/me');
  console.log('========================');
  res.send(req.user);
};

////////////////
// MINI TESTS //
////////////////
const minitests = (req, res) => {
  console.log('========================');
  console.log('MINI TEST');
  console.log('========================');
  const body = _.pick(req.body, ['email', 'password']);
  const newUser = new User(body);

  newUser
    .save()
    .then(user => user.toJSON())
    .then(() => res.send())
    .catch(e => res.status(400).send(JSON.stringify(e.message, undefined, 2)));
};

module.exports = {
  postUsers,
  postUsersLogin,
  getUsersMe,
  minitests
};
