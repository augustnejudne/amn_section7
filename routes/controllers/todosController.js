const { Todo } = require('../../models/models');
const { ObjectID } = require('mongodb');

///////////////
// GET TODOS //
///////////////
const todosGet = (req, res) => {
  Todo.find()
    .then(d => res.send(d))
    .catch(e => res.send(e));
};

///////////////////
// GET TODOS/:ID //
///////////////////
const todosGetByID = (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id)
    .then(d => (d ? res.send(d) : res.status(404).send()))
    .catch(e => res.status(400).send(e.message));
};

////////////////
// POST TODOS //
////////////////
const todosPost = (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo
    .save()
    .then(d => res.send(d))
    .catch(e => res.status(400).send(e.message));
};

/////////////////////
// PATCH TODOS/:ID //
/////////////////////
const todosPatch = (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  const update = req.body;
  Todo.findOneAndUpdate({ _id: id }, { $set: update }, { new: true })
    .then(d => (d ? res.send(d) : res.send(404).send()))
    .catch(e => res.send(e.message));
};

//////////////////////
// DELETE TODOS/:ID //
//////////////////////
const todosDeleteByID = (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndDelete({ _id: id })
    .then(d => (d ? res.send(d) : res.send(404).send()))
    .catch(e => res.send(e.message));
};

module.exports = {
  todosGet,
  todosGetByID,
  todosPost,
  todosPatch,
  todosDeleteByID
};
