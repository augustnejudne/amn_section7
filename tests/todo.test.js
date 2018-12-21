const request = require('supertest');
const { ObjectID } = require('mongodb');
const { assert } = require('chai');
const Todo = require('../models/TodoModel');
const { app } = require('../server/server');

const todos = [
  {
    _id: new ObjectID(),
    text: 'apple'
  },
  {
    _id: new ObjectID(),
    text: 'banana'
  }
];

beforeEach(done => {
  Todo.collection.drop(() => {
    Todo.insertMany(todos).then(() => done());
  });
});

describe('TODO TESTS', () => {
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
      .expect(res => assert.equal(res.body.text, 'apple'))
      .end(done);
  });

  it('should post a todo', done => {
    const todo = { text: 'carrot' };
    request(app)
      .post('/todos')
      .send(todo)
      .expect(200)
      .expect(res => assert.equal(res.body.text, 'carrot'))
      .end(done);
  });

  it('should update the text of a todo', done => {
    const update = { text: 'banana updated' };
    request(app)
      .patch(`/todos/${todos[1]._id.toString()}`)
      .send(update)
      .expect(200)
      .expect(res => assert.equal(res.body.text, 'banana updated'))
      .end(done);
  });

  it('should delete a todo', done => {
    request(app)
      .delete(`/todos/${todos[1]._id.toString()}`)
      .expect(200)
      .expect(res => assert.equal(res.body.text, 'banana'))
      .end(done);
  });
});
