// const { SHA256 } = require('crypto-js');

// const message = 'I am number one!';
// const hash = SHA256(message);
// console.log(message);
// console.log(hash.toString());

// const data = { id: 4 };
// const token = { data, hash: SHA256(JSON.stringify(data) + 'secret').toString() };

// // GRANT ACCESS
// const requestHashGrant = SHA256(JSON.stringify(token.data) + 'secret').toString();

// // DENY ACCESS
// const requestHashDeny = SHA256(JSON.stringify(token.data)).toString();

// // if (requestHashGrant === token.hash) {
// if (requestHashDeny === token.hash) {
//   console.log('GRANTED');
// }
// else {
//   console.log('DENIED');
// }


// // require jwt
// const jwt = require('jsonwebtoken');

// // create data
// const data = { id: 4 };

// // hash the data
// // when and where does the token show up?
// // so my app is going to find the user with the same token?
// const token = jwt.sign(data, '123abc');

// // decode the data
// // when and where does decoded show up?
// // decoded is the original data, right?
// const decoded = jwt.verify(token, '123abc');

const bcrypt = require('bcryptjs');

const password = '143212';
var hashed;

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    hashed = hash;
  });
});


bcrypt.compare(password, hashed);






