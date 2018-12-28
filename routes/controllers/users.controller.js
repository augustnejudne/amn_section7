const _ = require('lodash');
const User = require('../../models/user.model');

///////////////
// POST USERS //
///////////////
const postUsers = (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const newUser = new User(body);

  newUser
    .save()
    .then(user => user.generateAuthToken())
    .then(token => res.header('x-auth', token).send(newUser))
    .catch(e => res.status(400).send(JSON.stringify(e.message, undefined, 2)));
};

/////////////////////
// POST USER/LOGIN //
/////////////////////


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
  // postUsersLogin
  minitests
};
