const _ = require('lodash');
const User = require('../../models/UserModel');

///////////////
// POST USER //
///////////////
const postUsers = (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const newUser = new User(body);

  newUser
    .save()
    .then(user => user.generateAuthToken())
    .then(token => res.header('x-auth', token).send(newUser))
    .catch(e => res.status(400).send(e.message));
};

//////////////////////
// POST USERS/LOGIN //
//////////////////////
const postUsersLogin = (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      user.generateAuthToken()
        .then(token => res.header('x-auth', token).send(user));
    })
    .catch(e => {
      res.status(400).send(e);
    });
};

//////////////////
// GET USERS/ME //
//////////////////
const getUsersMe = (req, res) => {
  res.send(req.user);
};

///////////////////////////
// DELETE USERS/ME/TOKEN //
///////////////////////////
const deleteUsersMe = (req, res) => {
  req.user.removeToken(req.token)
    .then(() => res.status(200).send(), () => res.status(400).send());
};

module.exports = {
  postUsers,
  postUsersLogin,
  getUsersMe,
  deleteUsersMe
};
