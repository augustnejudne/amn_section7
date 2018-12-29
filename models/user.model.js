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
  const user = this;

  return _.pick(user.toObject(), ['_id', 'email']);
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
    .sign({ _id: user._id.toHexString(), access }, process.env.SALT)
    .toString();

  user.tokens = user.tokens.concat([{ access, token }]);
  return user.save().then(() => token);
};

//////////////////////////////
// REMOVE TOKEN             //
// INSTANCE METHOD          //
// removes the user's token //
// serves as a logout       //
//////////////////////////////
UserSchema.methods.removeToken = function(token) {
  const user = this;

  return user.updateOne({
    $pull: {
      tokens: {
        token
      }
    }
  });
};

////////////////////////////////////////////////////
// FIND BY TOKEN                                  //
// MODEL METHOD                                   //
// takes the token and finds the appropriate user //
////////////////////////////////////////////////////
UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded = undefined;

  try {
    decoded = jwt.verify(token, process.env.SALT);
  } catch (e) {
    return Promise.reject(e);
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

///////////////////////////////////////////////////
// FIND BY CREDENTIALS                           //
// MODEL METHOD                                  //
// takes email and password                      //
// searches the User collection for user         //
// checks if password matches the password in db //
// uses Promise to call bcrypt                   //
///////////////////////////////////////////////////
UserSchema.statics.findByCredentials = function(email, password) {
  const User = this;

  return User.findOne({ email }).then(user => {
    if (!user) {
      return Promise.reject('Invalid email');
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (!res) {
          return reject('Invalid password');
        }

        return resolve(user);
      });
    });
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
