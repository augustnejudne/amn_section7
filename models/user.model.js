const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

////////////////
// UserSchema //
////////////////
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

/////////////////////////
// USER SCHEMA METHODS //
/////////////////////////

//////////////////////////////////////////////////////////
// TO JSON                                              //
// INSTANCE METHOD:                                     //
// determines exactly what gets sent back to the client //
// this doesn't actually have to be called              //
// it just gets called automatically                    //
// in the controller                                    //
//////////////////////////////////////////////////////////
UserSchema.methods.toJSON = function() {
  console.log('========================');
  console.log('CONVERTING TO JSON');
  console.log('========================');
  const user = this;

  return _.pick(user, ['_id', 'email']);
};

////////////////////////////////////////////
// GENERATE AUTH TOKEN                    //
// INSTANCE METHOD:                       //
// generates an auth token                //
// pushes auth token to the user instance //
// returns the token                      //
////////////////////////////////////////////
UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, 'secret1432')
    .toString();

  user.tokens = user.tokens.concat([{ access, token }]);
  console.log('========================');
  console.log('GENERATING AUTH TOKEN');
  console.log(user.tokens);
  console.log('========================');

  return user.save().then(() => token);
};

////////////////////////////////////////////////////
// FIND BY TOKEN                                  //
// MODEL METHOD:                                  //
// takes the token and finds the appropriate user //
////////////////////////////////////////////////////
UserSchema.statics.findByToken = function(token) {
  console.log('========================');
  console.log('FINDING BY TOKEN');
  console.log(token);
  console.log('========================');
  const User = this;
  let decoded = undefined;

  try {
    decoded = jwt.verify(token, 'secret1432');
  } catch (e) {
    return Promise.reject(e);
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

///////////////////////////////////
// MONGOOSE MIDDLEWARE PRE: SAVE //
///////////////////////////////////
UserSchema.pre('save', function(next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

////////////////
// USER MODEL //
////////////////
const User = new mongoose.model('users', UserSchema);

module.exports = User;
