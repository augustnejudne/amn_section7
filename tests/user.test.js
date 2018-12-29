const request = require('supertest');
const { assert } = require('chai');
const User = require('../models/user.model');
const app = require('../server/server');
const users = require('./seeds/user.seed');

beforeEach(done => {
  User.deleteMany({})
    .then(() => {
      const userOne = new User(users[0]).save();
      const userTwo = new User(users[1]).save();
      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
});

describe('USERS TESTS', () => {
  describe('POST /users', () => {
    it('registers a new user', done => {
      const newUser = {
        email: 'newUser@test.com',
        password: 'newUser'
      };

      request(app)
        .post('/users')
        .send(newUser)
        .expect(200)
        .expect(res => {
          assert.equal(res.body.email, newUser.email);
        })
        .end(done);
    });

    it('returns a 400 if email is empty', done => {
      const newUser = new User({
        email: '',
        password: 'newUser'
      });

      request(app)
        .post('/users')
        .send(newUser)
        .expect(400)
        .end(done);
    });

    it('returns a 400 if email is invalid', done => {
      const newUser = new User({
        email: 'newUser',
        password: 'newUser'
      });

      request(app)
        .post('/users')
        .send(newUser)
        .expect(400)
        .end(done);
    });

    it('returns a 400 if password is less than 6 characters', done => {
      const newUser = new User({
        email: 'newUser',
        password: '1234'
      });

      request(app)
        .post('/users')
        .send(newUser)
        .expect(400)
        .end(done);
    });
  });

  describe('POST /users/login', () => {
    it('logs in a user with a valid username/password and receives an auth token', done => {
      const { email, password } = users[0];
      request(app)
        .post('/users/login')
        .send({ email, password })
        .expect(200)
        .expect(res => {
          assert.equal(res.body.email, email);
          assert.exists(res.header['x-auth']);
        })
        .end(done);
    });

    it('should get a 400 if username is not found', done => {
      request(app)
        .post('/users/login')
        .send({ email: 'sombody', password: '123141' })
        .expect(400)
        .expect(res => {
          assert.notExists(res.header['x-auth']);
        })
        .end(done);
    });

    it('should get a 400 if password is wrong', done => {
      const { email } = users[0];
      request(app)
        .post('/users/login')
        .send({ email, password: '1231234' })
        .expect(400)
        .end(done);
    });
  });

  describe('GET /users/me', () => {
    it('returns a user token', done => {
      request(app)
        .get('/users/me')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .end(done);
    });

    it('should get a 401 if no valid x-auth', done => {
      request(app)
        .get('/users/me')
        .expect(401)
        .end(done);
    });
  });

  describe('DELETE /users/me/token', () => {
    it('deletes a user token', done => {
      request(app)
        .delete('/users/me/token')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .end(done);
    });
  });
});
