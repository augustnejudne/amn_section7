const _ = require('lodash');
const User = require('../../models/user.model');

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

module.exports = {
  postUsers
};
