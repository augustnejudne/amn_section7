const _ = require('lodash');
const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');

///////////////
// POST USERS //
///////////////
const postUsers = (req, res) => {
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
  const { email, password } = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(email, password)
    .then(user => {
      user.generateAuthToken()
        .then(token => {
          res.header('x-auth', token).send(user);
        });
    })
    .catch(e => res.status(400).send(e));
};

//////////////////
// GET USERS/ME //
//////////////////
const getUsersMe = (req, res) => {
  res.send(req.user);
};

/////////////////////
// DELETE USERS ME //
/////////////////////
const deleteUsersMeToken = (req, res) => {
  req.user.removeToken(req.token)
    .then(() => {
      res.status(200).send();
    }, () => {
      res.status(400).send();
    });
};

////////////////
// MINI TESTS //
////////////////
const minitests = (req, res) => {
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
  deleteUsersMeToken,
  minitests
};
