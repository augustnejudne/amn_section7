const request = require('supertest');
const { assert } = require('chai');
const Todo = require('../models/todo.model');
const app = require('../server/server');
const todos = require('./seeds/todo.seed');
const users = require('./seeds/user.seed');

const userOneToken = users[0].tokens[0].token;

beforeEach(() => {
  Todo.deleteMany({}).then(() => {
    Todo.insertMany(todos);
  });
});

describe('TODOS TESTS', () => {
  describe('POST /todos', () => {
    it('posts a new todo to the database', done => {
      const newTodo = new Todo({ text: 'new todo from POST /todos' });
      request(app)
        .post('/todos')
        .set('x-auth', userOneToken)
        .send(newTodo)
        .expect(200)
        .expect(res => {
          assert.property(res.body, 'text');
          assert.equal(res.body.text, newTodo.text);
        })
        .end(done);
    });

    it('gets a 401 if no x-auth', done => {
      const newTodo = new Todo({ text: 'new todo from POST /todos' });
      request(app)
        .post('/todos')
        .send(newTodo)
        .expect(401)
        .end(done);
    });

    it('gets a 400 if text is empty', done => {
      const newTodo = new Todo({ text: '' });
      request(app)
        .post('/todos')
        .set('x-auth', userOneToken)
        .send(newTodo)
        .expect(400)
        .end(done);
    });
  });

  describe('GET /todos', () => {
    it('gets an array of todos', done => {
      request(app)
        .get('/todos')
        .set('x-auth', userOneToken)
        .expect(200)
        .expect(res => {
          assert.typeOf(res.body, 'array');
          assert.lengthOf(res.body, 3);
        })
        .end(done);
    });

    it('gets an array of three todos by userOne', done => {
      request(app)
        .get('/todos')
        .set('x-auth', userOneToken)
        .expect(200)
        .expect(res => {
          assert.typeOf(res.body, 'array');
          assert.lengthOf(res.body, 3);
          assert.equal(res.body[0].text, todos[0].text);
        })
        .end(done);
    });

    it('gets a 401 if no x-auth', done => {
      request(app)
        .get('/todos')
        .expect(401)
        .end(done);
    });

    it('gets an individual todo', done => {
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .set('x-auth', userOneToken)
        .expect(200)
        .expect(res => {
          assert.typeOf(res.body, 'array');
          assert.property(res.body[0], 'text');
          assert.equal(res.body[0].text, todos[0].text);
        })
        .end(done);
    });

    it('gets a 404 if id not found', done => {
      request(app)
        .get('/todos/12341234')
        .set('x-auth', userOneToken)
        .expect(404)
        .end(done);
    });
  });

  describe('PATCH /todos', () => {
    it('updates an existing todo', done => {
      const update = { text: 'update from PATCH /todos' };
      request(app)
        .patch(`/todos/${todos[0]._id.toHexString()}`)
        .set('x-auth', userOneToken)
        .send(update)
        .expect(200)
        .expect(res => {
          assert.equal(res.body.text, update.text);
        })
        .end(done);
    });

    it('gets a 401 if no x-auth', done => {
      const update = { text: 'update from PATCH /todos' };
      request(app)
        .patch(`/todos/${todos[0]._id.toHexString()}`)
        .send(update)
        .expect(401)
        .end(done);
    });

    it('should get 404 if id does not exist', done => {
      const update = { text: 'update from PATCH /todos' };
      request(app)
        .patch(`/todos/${todos[0]._id.toHexString()}12341234`)
        .set('x-auth', userOneToken)
        .send(update)
        .expect(404)
        .end(done);
    });

    it('shoudl get 400 if update text is empty', done => {
      const update = { text: '' };
      request(app)
        .patch(`/todos/${todos[0]._id.toHexString()}`)
        .set('x-auth', userOneToken)
        .send(update)
        .expect(400)
        .end(done);
    });
  });

  describe('DELETE /todos', () => {
    it('should delete a todo', done => {
      request(app)
        .delete(`/todos/${todos[1]._id.toHexString()}`)
        .set('x-auth', userOneToken)
        .expect(200)
        .expect(res => {
          assert.equal(res.body.text, todos[1].text);
        })
        .end(done);
    });

    it('get a 401 if no x-auth', done => {
      request(app)
        .delete(`/todos/${todos[1]._id.toHexString()}`)
        .expect(401)
        .end(done);
    });

    it('should get 404 if id not found', done => {
      request(app)
        .delete(`/todos/${todos[1]._id.toHexString()}1241234`)
        .set('x-auth', userOneToken)
        .expect(404)
        .end(done);
    });
  });
});
