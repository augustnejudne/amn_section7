const mongoose = require('mongoose');
const UserSchema = require('./schemas/userSchema');
const TodoSchema = require('./schemas/todoSchema');

const User = mongoose.model('users', UserSchema);
const Todo = mongoose.model('todos', TodoSchema);

module.exports = { User, Todo };