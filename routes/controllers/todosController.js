const _ = require('lodash');
const { ObjectID } = require('mongodb');
const Todo = require('../../models/TodoModel');

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
      // console.log('========================');
      // console.log('todosController.js, 18');
      // console.log('SAVED newTodo\n', d);
      // console.log('========================');
      res.status(200).send(d);
    })
    .catch(e => {
      // console.log('========================');
      // console.log('todosController.js, 25');
      // console.log('========================');
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
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.find({_id: id, _creator: req.user._id})
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
  if (update.text === '') {
    return res.status(400).send();
  };
  // console.log('========================');
  // console.log('todosController.js');
  // console.log(update);
  // console.log('========================');
  Todo.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: update }, { new: true })
    .then(d => (d ? res.send(d) : res.status(404).send()))
    .catch(e => res.status(400).send(e.message));
};

//////////////////////
// DELETE TODOS/:ID //
//////////////////////
const deleteTodosID = (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndDelete({ _id: id, _creator: req.user._id })
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
