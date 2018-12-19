const { index } = require('./controllers/controllers');
const {
  todosGet,
  todosGetByID,
  todosPost,
  todosPatch,
  todosDeleteByID
} = require('./controllers/todosController');
const {
  usersGet,
  usersGetByID,
  usersPost,
  usersPatch,
  usersDeleteByID
} = require('./controllers/usersController');

module.exports = app => {
  app.get('/', index);
  app.get('/todos', todosGet);
  app.get('/todos/:id', todosGetByID);
  app.post('/todos', todosPost);
  app.patch('/todos/:id', todosPatch);
  app.delete('/todos/:id', todosDeleteByID);
  app.get('/users', usersGet);
  app.get('/users/:id', usersGetByID);
  app.post('/users', usersPost);
  app.patch('/users/:id', usersPatch);
  app.delete('/users/:id', usersDeleteByID);
};
