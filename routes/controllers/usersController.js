const { User } = require('../../models/models');
const { ObjectID } = require('mongodb');

///////////////
// GET USERS //
///////////////
const usersGet = (req, res) => {
  User.find()
    .then(d => res.send(d))
    .catch(e => res.send(e));
};

///////////////////
// GET USERS/:ID //
///////////////////
const usersGetByID = (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  User.findById({ _id: id })
    .then(d => (d ? res.send(d) : res.status(404).send()))
    .catch(e => res.status(400).send(e.message));
};

////////////////
// POST USERS //
////////////////
const usersPost = (req, res) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then(d => res.send(d))
    .catch(e => res.status(400).send(e));
};

/////////////////////
// PATCH USERS/:ID //
/////////////////////
const usersPatch = (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  const update = req.body;
  User.findOneAndUpdate({ _id: id }, { $set: update }, { new: true })
    .then(d => (d ? res.send(d) : res.status(404).send()))
    .catch(e => res.status(400).send(e.message));
};

//////////////////////
// DELETE USERS/:ID //
//////////////////////
const usersDeleteByID = (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  User.findOneAndDelete({ _id: id })
    .then(d => (d ? res.send(d) : res.status(404).send()))
    .catch(e => res.status(400).send(e.message));
};

module.exports = {
  usersGet,
  usersGetByID,
  usersPost,
  usersPatch,
  usersDeleteByID
};
