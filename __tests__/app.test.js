const request = require('supertest');
const nock = require('nock');
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

describe('GET /jokes should respond with a relevent message', () => {
  it('Get /jokes should respond with: This is the all jokes endpoint', done => {
    const mockResponse = {
      type: 'success',
      value: [
        {
          id: 1,
          joke: 'i am a joke',
          categories: [],
        },
        {
          id: 2,
          joke: 'i am another joke',
          categories: [],
        },
      ],
    };

    nock('https://api.icndb.com')
      .get('/jokes')
      .reply(200, mockResponse);

    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.jokes).toEqual([
          {
            categories: [],
            id: 1,
            joke: 'i am a joke',
          },
          {
            categories: [],
            id: 2,
            joke: 'i am another joke',
          },
        ]);
        done();
      });
  });
});

describe('GET /joke/random responds with a relevent message', () => {
  it('GET /random/joke should respond with: This is the random joke endpoint', done => {
    request(app)
      .get('/joke/random')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('This is the random joke endpoint');
        done();
      });
  });
});

describe('GET /joke/random/personal/:first/:last responds with a relevent message', () => {
  it('GET /joke/random/personal/:first/:last responds with: This is the personalised joke endpoint', done => {
    request(app)
      .get('/joke/random/personal/Guy/Garvey')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('This is the personalised joke endpoint');
        done();
      });
  });
});
