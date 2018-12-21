const User = require('../models/UserModel');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth');

  User.findByToken(token)
    .then(user => {
      if (!user) {
        Promise.reject();
      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch(e => res.status(401).send(e));
};

module.exports = authenticate;