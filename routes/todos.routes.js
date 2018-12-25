const {
  postTodos,
  getTodos,
  getTodosID,
  patchTodos,
  deleteTodosID
} = require('./controllers/todos.controller');

module.exports = app => {
  app.post('/todos', postTodos);
  app.get('/todos', getTodos);
  app.get('/todos/:id', getTodosID);
  app.patch('/todos/:id', patchTodos);
  app.delete('/todos/:id', deleteTodosID);
};
