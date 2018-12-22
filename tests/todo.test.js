const request = require('supertest');
const { assert } = require('chai');
const { app } = require('../server/server');
const { todos, populateTodos } = require('./seeds/todoSeed');

describe('TODO TESTS', () => {
  beforeEach(populateTodos);
  it('should get all the todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        assert.typeOf(res.body, 'array');
      })
      .end(done);
  });

  it('should get an individual todo', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toString()}`)
      .expect(200)
      .expect(res => assert.equal(res.body.text, todos[0].text))
      .end(done);
  });

  it('should get 404 if todo doesn\'t exist', done => {
    request(app)
      .get('/todos/1234')
      .expect(404)
      .end(done);
  });

  it('should post a todo', done => {
    const todo = { text: 'Third test todo' };
    request(app)
      .post('/todos')
      .send(todo)
      .expect(200)
      .expect(res => assert.equal(res.body.text, todo.text))
      .end(done);
  });

  it('should update the text of a todo', done => {
    const update = { text: 'Second test todo UPDATED!!!' };
    request(app)
      .patch(`/todos/${todos[1]._id.toString()}`)
      .send(update)
      .expect(200)
      .expect(res => assert.equal(res.body.text, update.text))
      .end(done);
  });

  it('should delete a todo', done => {
    request(app)
      .delete(`/todos/${todos[0]._id.toString()}`)
      .expect(200)
      .expect(res => assert.equal(res.body.text, 'First test todo'))
      .end(done);
  });

  it('should get 400 if text is empty', done => {
    const newTodo = { text: '' };
    request(app)
      .post('/todos')
      .send(newTodo)
      .expect(400)
      .end(done);
  });
});
