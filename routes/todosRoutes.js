const {
  postTodos,
  getTodos,
  getTodosID,
  patchTodos,
  deleteTodosID
} = require('./controllers/todosController');
const authenticate = require('../middleware/authenticate');

module.exports = app => {
  app.post('/todos', authenticate, postTodos);
  app.get('/todos', authenticate, getTodos);
  app.get('/todos/:id', authenticate, getTodosID);
  app.patch('/todos/:id', authenticate, patchTodos);
  app.delete('/todos/:id', authenticate, deleteTodosID);
};
