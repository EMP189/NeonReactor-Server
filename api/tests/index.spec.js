const { json } = require('express/lib/response');
const request = require('supertest');
const app = require('../server');

describe('API Server', () => {
  const port = 5000;
  let api;
  beforeAll(() => {
    api = app.listen(port, () => {
      console.log(`Express is running on port ${port}`);
    })
  });

  afterAll(() => {
    console.log('Gravefully stopping test server');
    api.close();
  })

  test('responds to get / with status of 200', () => {
    return request(api).get('/').set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200);
  });

  test('GET /players retreives a leaderboard', () => {
     return request(api)
      .get('/players')
      .expect(200);
  });

  test('POST /players adds a new player', () => {
    return request(api)
      .post('/players')
      .send({'username': 'test2'})
      .expect(201);
  });

  test('POST /players does not add player that already exists', () => {
    return request(api)
      .post('/players')
      .send({'username': 'test2'})
      .expect(409);
  });

  test('GET /players/:username get player score', () => {
    return request(api)
      .get('/players/Test1')
      .expect(200)
      .expect({'username': 'Test1','score': 100});
  });

  test('PATCH /players/username update player score', () => {
    request(api)
      .patch('/players/test2')
      .send({ score: 70}).expect(204);
  });

})