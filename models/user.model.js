const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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

//////////////////////
// INSTANCE METHODS //
//////////////////////

//////////////////////////////////////////////////////////
// TO JSON                                              //
// determines exactly what gets sent back to the client //
// this doesn't actually have to be called              //
// it just gets called automatically                    //
// in the controller                                    //
//////////////////////////////////////////////////////////
UserSchema.methods.toJSON = function() {
  const user = this;

  return _.pick(user, ['_id', 'email']);
};

////////////////////////////////////////////
// GENERATE AUTH TOKEN                    //
// generates an auth token                //
// pushes auth token to the user instance //
// returns the token                      //
////////////////////////////////////////////
UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({ _id: user._id.toHexString(), access }, 'secret1432').toString();

  // user.tokens.push({ access, token });

  user.tokens = user.tokens.concat([{ access, token }]);

  return user.save().then(() => token);
};

////////////////
// USER MODEL //
////////////////
const User = new mongoose.model('users', UserSchema);

module.exports = User;
