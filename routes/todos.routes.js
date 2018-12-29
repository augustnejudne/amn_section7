const authenticate = require('../middleware/authenticate');
const {
  postTodos,
  getTodos,
  getTodosID,
  patchTodos,
  deleteTodosID
} = require('./controllers/todos.controller');

module.exports = app => {
  app.post('/todos', authenticate, postTodos);
  app.get('/todos', authenticate, getTodos);
  app.get('/todos/:id', authenticate, getTodosID);
  app.patch('/todos/:id', authenticate, patchTodos);
  app.delete('/todos/:id', authenticate, deleteTodosID);
};
