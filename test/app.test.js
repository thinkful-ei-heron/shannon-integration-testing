const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('Express App testing', () => {
  
  it('invokes the endpoint correctly and returns a message from GET /', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'hi express');
  });
});


describe('GET /sum', () => {
  it('8/4 should be 2', () => {
    return supertest(app)
      .get('/sum')
      .query({a:8 , b:4 })
      .expect(200, '8 divided by 4 is equal to: 2');
  });

  it('should return 400 if a is missing', () => {
    return supertest(app)
      .get('/sum')
      .query({b:2})
      .expect(400, 'value is needed for both a and b');
  });

  it('should return 400 if b is missing', () => {
    return supertest(app)
      .get('/sum')
      .query({a:2})
      .expect(400, 'value is needed for both a and b');
  });

  it('should return 400 if b is 0', () => {
    return supertest(app)
      .get('/sum')
      .query({a:2, b:0})
      .expect(400, 'b cannot be 0');
  });

  it('should return 400 if a is NaN', () => {
    return supertest(app)
      .get('/sum')
      .query({a:'hi', b:0})
      .expect(400, 'values for a and b must b numbers');
  });

  it('should return 400 if b is NaN', () => {
    return supertest(app)
      .get('/sum')
      .query({a:2, b:'hi'})
      .expect(400, 'values for a and b must b numbers');
  });
});


describe('GET /generate', () => {
  it('should generate an array of 5', () => {
    return supertest(app)
      .get('/generate')
      .query({n: 5})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        expect(res.body).to.have.members([1, 2, 3, 4, 5]);
      });
  });


})