const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');


describe('GET /midpoint', () => {
  it('should find midpoint between NY and LA', () => {
    const query = {
      lat1: 40.6976701, //NY
      lon1: -74.2598674, //NY
      lat2: 34.0207305, //LA
      lon2: -118.6919221 //LA
    };

    const expected = {
      lat: 39.50597300917347,
      lon: -97.51789156106972
    };

    return supertest(app)
      .get('/midpoint')
      .query(query)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.have.all.keys('lat', 'lon');
        expect(res.body).to.eql(expected);
      });

  });

  it('should error when missing a value', () => {
    const query = {
      lat1: 40.6976701, //NY
      lon1: -74.2598674, //NY
      lat2: 34.0207305, //LA
    };

    return supertest(app)
      .get('/midpoint')
      .query(query)
      .expect(400, 'Must have both latitude and longitude for two locations');
  });


});