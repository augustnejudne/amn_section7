const request = require('supertest');
const { ObjectID } = require('mongodb');
const { assert } = require('chai');
const { User } = require('../models/models');
const { app } = require('../server/server');

const users = [
  {
    _id: new ObjectID(),
    firstName: '   Kim    ',
    lastName: '  Nejudne   ',
    age: 30,
    married: true
  },
  {
    _id: new ObjectID(),
    firstName: '   Linus Cloud   ',
    lastName: '  Nejudne   ',
    age: 1,
    married: false
  }
];

beforeEach(done => {
  User.collection.drop(() => {
    User.insertMany(users).then(() => done());
  });
});

describe('USER TESTS', () => {
  it('should return users', done => {
    request(app)
      .get('/users')
      .expect(200)
      .expect(res => assert.equal(res.body[0].firstName, 'Kim'))
      .end(done);
  });

  it('should return a single user', done => {
    request(app)
      .get(`/users/${users[1]._id.toString()}`)
      .expect(200)
      .expect(res => assert.equal(res.body.firstName, 'Linus Cloud'))
      .end(done);
  });

  it('should add a new user', done => {
    const newUser = {
      firstName: 'August',
      lastName: 'Nejudne',
      age: 30,
      married: true
    };

    request(app)
      .post('/users')
      .send(newUser)
      .expect(200)
      .expect(res => assert.equal(res.body.firstName, 'August'))
      .end(done);
  });

  it('should update a user', done => {
    const update = {
      lastName: 'Nejudne Updated'
    };
    request(app)
      .patch(`/users/${users[0]._id.toString()}`)
      .send(update)
      .expect(200)
      .expect(res => assert.equal(res.body.lastName, 'Nejudne Updated'))
      .end(done);
  });

  it('should delete a user', done => {
    request(app)
      .delete(`/users/${users[0]._id.toString()}`)
      .expect(200)
      .expect(res => assert.equal(res.body.firstName, 'Kim'))
      .end(done);
  });
});
