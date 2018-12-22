const _ = require('lodash');
const { ObjectID } = require('mongodb');
const Todo = require('../../models/TodoModel');

////////////////
// POST TODOS //
////////////////
const postTodos = (req, res) => {
  const newTodo = new Todo({
    text: req.body.text
  });
  newTodo
    .save()
    .then(d => res.send(d))
    .catch(e => res.status(400).send(e.message));
};

///////////////
// GET TODOS //
///////////////
const getTodos = (req, res) => {
  Todo.find()
    .then(d => res.send(d))
    .catch(e => res.send(e));
};

///////////////////
// GET TODOS/:ID //
///////////////////
const getTodosID = (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id)
    .then(d => (d ? res.send(d) : res.status(404).send()))
    .catch(e => res.status(400).send(e.message));
};

/////////////////////
// PATCH TODOS/:ID //
/////////////////////
const patchTodos = (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  const update = _.pick(req.body, ['text']);
  Todo.findOneAndUpdate({ _id: id }, { $set: update }, { new: true })
    .then(d => (d ? res.send(d) : res.send(404).send()))
    .catch(e => res.send(e.message));
};

//////////////////////
// DELETE TODOS/:ID //
//////////////////////
const deleteTodosID = (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndDelete({ _id: id })
    .then(d => (d ? res.send(d) : res.send(404).send()))
    .catch(e => res.send(e.message));
};

module.exports = {
  postTodos,
  getTodos,
  getTodosID,
  patchTodos,
  deleteTodosID
};
