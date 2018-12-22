const request = require('supertest');
const { assert } = require('chai');
const { app } = require('../server/server');
const { users, populateUsers } = require('./seeds/userSeed');

describe('USER TESTS', () => {
  before(populateUsers);
  it('should return user if authenticated', done => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        assert.equal(res.body._id, users[0]._id.toHexString());
        assert.equal(res.body.email, users[0].email);
      })
      .end(done);
  });

  it('it should return a 401 if not authenticated', done => {
    request(app)
      .get('/users/me')
      .expect(401)
      .end(done);
  });

  it('should sign up a user', done => {
    const newUser = { email: 'userThree@test.com', password: 'userThreePass' };
    request(app)
      .post('/users')
      .send(newUser)
      .expect(200)
      .expect(res => {
        assert.property(res.header, 'x-auth');
        assert.property(res.body, '_id');
        assert.equal(res.body.email, newUser.email);
      })
      .end(done);
  });

  it('should return a 400 if user already exists', done => {
    const newUser = { email: 'userThree@test.com', password: 'userThreePass' };
    request(app)
      .post('/users')
      .send(newUser)
      .expect(400)
      .end(done);
  });

  it('should return a 400 if email is invalid', done => {
    const newUser = { email: 'userThree.test.com', password: 'userThreePass' };
    request(app)
      .post('/users')
      .send(newUser)
      .expect(400)
      .end(done);
  });

  it('should return a 400 if password is less than 6 characters', done => {
    const newUser = { email: 'userFour@test.com', password: 'user' };
    request(app)
      .post('/users')
      .send(newUser)
      .expect(400)
      .end(done);
  });
});
