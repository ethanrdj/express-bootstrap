const request = require('supertest');
const app = require('../src/app');

describe('GET / should respond with a welcome message', () => {
  it('GET / should respond with Hello world!', done => {
    request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Welcome to my jokes API!');
        done();
      });
  });
});
