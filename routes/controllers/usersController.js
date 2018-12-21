const _ = require('lodash');
const User = require('../../models/UserModel');

///////////////
// POST USER //
///////////////
const usersPost = (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const newUser = new User(body);

  newUser
    .save()
    .then(() => newUser.generateAuthToken())
    .then(token => res.header('x-auth', token).send(newUser))
    .catch(e => res.status(400).send(e.message));
};

//////////////////
// GET USERS/ME //
//////////////////
const usersGetMe = (req, res) => {
  res.send(req.user);
};

module.exports = {
  usersPost,
  usersGetMe
};
