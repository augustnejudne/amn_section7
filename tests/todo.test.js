const request = require('supertest');
const { assert } = require('chai');
const { app } = require('../server/server');
const { todos, populateTodos } = require('./seeds/todoSeed');
const { users, populateUsers } = require('./seeds/userSeed');

describe('TODO TESTS', () => {
  before(populateUsers);
  beforeEach(populateTodos);

  it('should post an authenticated todo', done => {
    const newTodo = { text: 'Third test todo' };
    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send(newTodo)
      .expect(200)
      .expect(res => {
        assert.equal(res.body.text, newTodo.text);
        assert.equal(res.body._creator, users[0]._id);
      })
      .end(done);
  });

  it('should get 401 if user is not authenticated', done => {
    const newTodo = { text: 'Third test todo' };
    request(app)
      .post('/todos')
      .send(newTodo)
      .expect(401)
      .end(done);
  });

  it('should get 400 if text is empty and user is authorized', done => {
    const newTodo = {};
    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send(newTodo)
      .expect(400)
      .end(done);
  });

  it('should get all the todos if authorized', done => {
    request(app)
      .get('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        assert.typeOf(res.body, 'array');
        assert.equal(res.body[0].text, todos[0].text);
      })
      .end(done);
  });

  it('should only be able to get own todos', done => {
    request(app)
      .get('/todos')
      .set('x-auth', users[1].tokens[0].token)
      .expect(200)
      .expect(res => {
        assert.typeOf(res.body, 'array');
        assert.equal(res.body[0].text, todos[1].text);
      })
      .end(done);
  });

  it('should get 401 if unauthorized to access GET /todos', done => {
    request(app)
      .get('/todos')
      .expect(401)
      .end(done);
  });

  it('should get an individual todo if authorized', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        assert.typeOf(res.body, 'array');
        assert.equal(res.body[0].text, todos[0].text);
      })
      .end(done);
  });

  it('should get 401 if unauthorized access to GET /todos/:id', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toString()}`)
      .expect(401)
      .end(done);
  });

  it('should get 404 if todo does not exist', done => {
    request(app)
      .get('/todos/1234')
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should update the text of a todo', done => {
    const update = { text: 'Second test todo UPDATED!!!' };
    request(app)
      .patch(`/todos/${todos[0]._id.toString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .send(update)
      .expect(200)
      .expect(res => assert.equal(res.body.text, update.text))
      .end(done);
  });

  it('should get a 404 if patch route is not found', done => {
    const update = { text: 'Second test todo UPDATED!!!' };
    request(app)
      .patch('/todos/1234')
      .set('x-auth', users[0].tokens[0].token)
      .send(update)
      .expect(404)
      .end(done);
  });

  it('should get a 401 if patch route is unauthorized', done => {
    const update = { text: 'Second test todo UPDATED!!!' };
    request(app)
      .patch('/todos/1234')
      .send(update)
      .expect(401)
      .end(done);
  });

  it('should get a 400 if patch route update text is empty', done => {
    const update = { text: '' };
    request(app)
      .patch(`/todos/${todos[0]._id.toString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .send(update)
      .expect(400)
      .end(done);
  });

  it('should delete a todo', done => {
    request(app)
      .delete(`/todos/${todos[0]._id.toString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => assert.equal(res.body.text, 'First test todo'))
      .end(done);
  });
});
