const request = require('supertest');
const app = require('../index');

describe('API Server', () => {
  const port = 5000;
  let api;

  beforeAll(() => {
    api = app.listen(port, () => {
      console.log(`Express is running on port ${port}`);
    })
  });

  afterAll((done) => {
    console.log('Gravefully stopping test server');
    api.close(done);
  })

  it('responds to get / with status of 200', (done) => {
    request(api).get('/').expect(200, done);
  });

  it('GET /players retreives a leaderboard', (done) => {
    request(api)
      .get('/players')
      .expect(200)
      .expect({'username': 'test1', 'score': 100});
  });

  it('POST /players adds a new player', (done) => {
    request(api)
      .post('/players')
      .send({'username': 'test2'})
      .expect(201);
  });

  it('POST /players does not add player that already exists', (done) => {
    request(api)
      .post('/players')
      .send({'username': 'test2'})
      .expect(409);
  });

  it('GET /players/:username get player score', (done) => {
    request(api)
      .get('/players/test1')
      .expect(200)
      .expect({'score': 100});
  });

  it('PATCH /players/username update player score', (done) => {
    request(api)
      .patch('/players/test2')
      .send(70)
      .expect(204)
      .expect({'score': 70});
  });

  it('POST /gameQ join room of id', (done) => {
    request(api)
      .post('/gameQ')
      .expect(201);
  });

  // it('GET /gameQ return list of room ids', (done) => {
  //   request(api).get('/players').expect(200, done);
  // });

  it('POST /gameQ/:id trigger game and send questions', (done) => {
    request(api)
      .post('/players/:id')
      .send({'question': 'Hello?', 'answer': 'Goodbye'})
      .expect(201);
  });
})