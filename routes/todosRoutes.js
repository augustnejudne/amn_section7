const {
  todosGet,
  todosGetByID,
  todosPost,
  todosPatch,
  todosDeleteByID
} = require('./controllers/todosController');

module.exports = app => {
  app.post('/todos', todosPost);
  app.get('/todos', todosGet);
  app.get('/todos/:id', todosGetByID);
  app.patch('/todos/:id', todosPatch);
  app.delete('/todos/:id', todosDeleteByID);
};
