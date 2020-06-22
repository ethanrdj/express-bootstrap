/**
 * @jest-environment node
 */

const request = require('supertest');
const nock = require('nock');
const app = require('../src/app');
const mockData = require('../data/mock-data');

describe('GET /  - Homepage', () => {
  it('GET / should respond with the homepage', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Welcome to my Chuck Norris API!');
  });
});

describe('GET /jokes', () => {
  it('should respond with a list of jokes', async () => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .reply(200, mockData.jokesMock);

    const res = await request(app).get('/jokes');
    expect(res.statusCode).toEqual(200);
    expect(res.body.jokes).toEqual(mockData.jokesMock.value);
  });

  it('should respond with an error message if something goes wrong', async () => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .replyWithError({ statusCode: 500, message: 'huge error' });

    const res = await request(app).get('/jokes');
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual('huge error');
  });
});

describe('GET /jokes/random', () => {
  it('should respond with a random joke', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .reply(200, mockData.randomJokesMock);

    const res = await request(app).get('/jokes/random');
    expect(res.statusCode).toEqual(200);
    expect(res.body.randomJoke).toEqual(mockData.randomJokesMock.value);
  });

  it('should respond with an error message if something goes wrong', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .replyWithError({ statusCode: 404, message: 'Somethings not right' });

    const res = await request(app).get('/jokes/random');
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual('Somethings not right');
  });
});

describe('GET /jokes/random/personal/:first/:last', () => {
  it('should respond with a personal joke', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'Ethan', lastName: 'Davis' })
      .reply(200, mockData.personalJokesMock);

    const res = await request(app).get('/jokes/random/personal/Ethan/Davis');
    expect(res.statusCode).toEqual(200);
    expect(res.body.personalJoke).toEqual(mockData.personalJokesMock.value);
  });

  it('should respond with an error message if something goes wrong', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'Ethan', lastName: 'Davis' })
      .replyWithError({ statusCode: 500, message: 'huge error' });

    const res = await request(app).get('/jokes/random/personal/Ethan/Davis');
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual('huge error');
  });
});
