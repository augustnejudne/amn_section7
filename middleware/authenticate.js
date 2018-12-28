const User = require('../models/user.model');

// authenticate middleware takes the x-auth header
// uses that to findByToken
// then modifies the req object
const authenticate = (req, res, next) => {
  console.log('========================');
  console.log('AUTHENTICATING');
  console.log('========================');
  const token = req.header('x-auth');

  User.findByToken(token)
    .then(user => {
      if (user) {
        req.user = user;
        req.token = token;
        // only call next if authentication works
        console.log('========================');
        console.log('REQUEST USER & TOKEN');
        console.log(req.user);
        console.log(req.token);
        console.log('========================');
        next();
      } else {
        Promise.reject();
      }
    })
    .catch(e => res.status(401).send(e.message));
};

module.exports = authenticate;
