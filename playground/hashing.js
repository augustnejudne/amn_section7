// const { SHA256 } = require('crypto-js');
const bcrypt = require('bcryptjs');

const password = '123abc!';
let myHash;

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    myHash = hash;
    // console.log(myHash);
    bcrypt.compare(password, myHash, (err, res) => {
      console.log(res);
    });
  });
});




// var password = 'pringles1432';
// var hash = SHA256(password).toString();

// console.log('password:', password);
// console.log('hash:', hash);

// var data = {
//   id: 4
// };

// var salt = 'secret1432';

// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + salt).toString()
// };

// var resultHash = SHA256(JSON.stringify(token.data) + salt).toString();

// if (resultHash === token.hash) {
//   console.log('OK');
// } else {
//   console.log('Not OK');
// }

