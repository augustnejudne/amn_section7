const request = require('supertest');
const { assert } = require('chai');
const { app } = require('../server/server');
const { users, populateUsers } = require('./seeds/userSeed');
const User = require('../models/UserModel');

describe('USER TESTS', () => {
  beforeEach(populateUsers);
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
    const newUser = { email: 'userTwo@test.com', password: 'userTwoPass' };
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

  it('should login an existing user', done => {
    const existingUser = {email: users[0].email, password: users[0].password};

    request(app)
      .post('/users/login')
      .send(existingUser)
      .expect(200)
      .expect(res => {
        assert.property(res.header, 'x-auth');
        assert.property(res.body, '_id');
        assert.property(res.body, 'email');
        assert.equal(res.body.email, existingUser.email);
      })
      .end(done);
  });

  it('should get 400 if user is not found', done => {
    const nonExistentUser = {email: 'userX@test.com', password: 'userOnePass'};

    request(app)
      .post('/users/login')
      .send(nonExistentUser)
      .expect(400)
      .end(done);
  });

  it('should get 400 if password does not match existing email', done => {
    const wrongPasswordUser = {email: 'userOne@test.com', password: 'wrongPassword'};

    request(app)
      .post('/users/login')
      .send(wrongPasswordUser)
      .expect(400)
      .end(done);
  });

  it('should delete session token', done => {
    // delete request to /users/me/token
    // set x-auth = inside the tokens array
    // expect 200
    // find user and verify that tokens array has length of 0
    request(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(() => {
        User.findById(users[0]._id.toString())
          .then(user => {
            assert.lengthOf(user.tokens, 0);
          })
          .catch(e => console.log(e));
      })
      .end(done);
  });
});
