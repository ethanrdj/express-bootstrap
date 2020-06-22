/**
 * @jest-environment node
 */

const request = require('supertest');
const nock = require('nock');
const app = require('../src/app');
const mockData = require('../test-data/mock-data');

describe('GET /  - Homepage', () => {
  it('GET / should respond with Hello world!', done => {
    request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Welcome to my Chuck Norris API!');
        done();
      });
  });
});

describe('GET /jokes', () => {
  it('should respond with a list of jokes', done => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .reply(200, mockData.jokesMock);

    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.jokes).toEqual(mockData.jokesMock.value);
        done();
      });
  });
  it('should respond with an error message if something goes wrong', done => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .replyWithError({ statusCode: 500, message: 'huge error' });

    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('huge error');
        done();
      });
  });
});

describe('GET /jokes/random', () => {
  it('should respond with a random joke', done => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .reply(200, mockData.randomJokesMock);

    request(app)
      .get('/jokes/random')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.randomJoke).toEqual(mockData.randomJokesMock.value);
        done();
      });
  });
  it('should respond with an error message if something goes wrong', done => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .replyWithError({ statusCode: 404, message: 'Somethings not right' });

    request(app)
      .get('/jokes/random')
      .then(res => {
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual('Somethings not right');
        done();
      });
  });
});

describe('GET /jokes/random/personal/:first/:last', () => {
  it('should respond with a personal joke', done => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'Ethan', lastName: 'Davis' })
      .reply(200, mockData.personalJokesMock);

    request(app)
      .get('/jokes/random/personal/Ethan/Davis')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.personalJoke).toEqual(mockData.personalJokesMock.value);
        done();
      });
  });

  it('should respond with an error message if something goes wrong', done => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'Ethan', lastName: 'Davis' })
      .replyWithError({ statusCode: 500, message: 'huge error' });

    request(app)
      .get('/jokes/random/personal/Ethan/Davis')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('huge error');
        done();
      });
  });
});
