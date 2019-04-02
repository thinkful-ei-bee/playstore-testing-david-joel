'use strict';

const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');

describe('Express App', () => {
  it('GET /apps should return a 200 code', () => { 
    return request(app) 
      .get('/apps')
      .expect(200);
  });
  // working test:
  
  it('GET /apps?sort=Rating should return sorted by rating', () => {
    return request(app)
      .get('/apps')
      .query({sort: 'Rating'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        let i = 0;
        let sorted = true;
        while(sorted && i < res.body.length - 1) {
          sorted = sorted && res.body[i].Rating >= res.body[i + 1].Rating;
          i++;
        }
        expect(sorted).to.be.true;
      });
  });

  it('GET /apps?genre=Action should return action genre apps', () => {
    return request(app)
      .get('/apps')
      .query({genre: 'Action'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        let i = 0;
        let sorted = true;
        while(sorted && i < res.body.length - 1) {
          sorted = sorted && res.body[i].Genres.includes('Action') ;
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
});
