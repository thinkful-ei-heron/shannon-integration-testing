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