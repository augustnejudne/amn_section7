const _ = require('lodash');
const { ObjectID } = require('mongodb');
const Todo = require('../../models/todo.model');

////////////////
// POST TODOS //
////////////////
const postTodos = (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  newTodo
    .save()
    .then(d => {
      res.status(200).send(d);
    })
    .catch(e => {
      res.status(400).send(e.message);
    });
};

///////////////
// GET TODOS //
///////////////
const getTodos = (req, res) => {
  Todo.find({ _creator: req.user._id })
    .then(d => res.send(d))
    .catch(e => res.send(e));
};

///////////////////
// GET TODOS/:ID //
///////////////////
const getTodosID = (req, res) => {
  const id = req.params.id;
  const creator = req.user._id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOne({ _id: id, _creator: creator })
    .then(todo => (todo ? res.send(todo) : Promise.reject()))
    .catch(e => res.status(400).send(e));
};

/////////////////////
// PATCH TODOS/:ID //
/////////////////////
const patchTodos = (req, res) => {
  const id = req.params.id;
  const creator = req.user._id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  const update = _.pick(req.body, ['text']);
  if (update.text === '') {
    return res.status(400).send();
  }
  // console.log('========================');
  // console.log('todosController.js');
  // console.log(update);
  // console.log('========================');
  Todo.findOneAndUpdate({ _id: id, _creator: creator }, { $set: update }, { new: true })
    .then(d => (d ? res.send(d) : res.status(404).send()))
    .catch(e => res.status(400).send(e.message));
};

//////////////////////
// DELETE TODOS/:ID //
//////////////////////
const deleteTodosID = (req, res) => {
  const id = req.params.id;
  const creator = req.user._id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndDelete({ _id: id, _creator: creator })
    .then(d => (d ? res.send(d) : res.status(404).send()))
    .catch(e => res.status(400).send(e.message));
};

module.exports = {
  postTodos,
  getTodos,
  getTodosID,
  patchTodos,
  deleteTodosID
};
