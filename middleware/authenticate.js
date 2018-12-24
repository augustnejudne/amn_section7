const User = require('../models/UserModel');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth');

  User.findByToken(token)
    .then(user => {
      if (!user) {
        // console.log('========================');
        // console.log('authenticate.js');
        // console.log('NO USER FOUND');
        // console.log('========================');
        return Promise.reject();
      }
      // console.log('========================');
      // console.log('authenticate.js');
      // console.log('USER FOUND, RETURNING USER');
      // console.log('========================');
      req.user = user;
      req.token = token;
      next();
    })
    .catch(e => res.status(401).send(e));
};

module.exports = authenticate;