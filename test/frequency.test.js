const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');


describe('GET /frequency', () => {
  it('returns expected for aaBBAAbbaa' , () => {
    const query = {s:'aaBBAAbbaa'};
    const expectedResult = {
      unique: 2,
      average: 5,
      highest: 'a',
      'a': 6,
      'b': 4
    };

    return supertest(app)
      .get('/frequency')
      .query(query)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.all.keys('unique', 'average', 'highest', 'a', 'b');
        expect(res.body).to.eql(expectedResult);
      });
  });

  it('returns an error when s is undefined', () => {
    return supertest(app)
      .get('/frequency')
      .expect(400, 'You must provide a string');
  });


});