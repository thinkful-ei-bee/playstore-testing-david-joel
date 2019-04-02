const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');

describe('Express App', () => {
  it('GET /apps should return a 200 code', () => { 
    return request(app) 
      .get('/apps')
      .expect(200);
  });
});