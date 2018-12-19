const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('../db/mongoose');
const { User, Todo } = require('../models/models');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo
    .save()
    .then((d) => {
      res.send(d);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

// app.get('/todos', (req, res) => {});

app.listen(3000, () => {
  console.log('Listening on PORT 3000');
});
