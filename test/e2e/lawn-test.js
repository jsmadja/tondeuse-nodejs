const request = require('supertest-promised');
const app = require('../../lib/index');
const assert = require('assert');

describe('Lawn', () => {
    it('should create a lawn', () =>
        request(app)
        .post('/lawn')
        .set({
            width: 5,
            height: 5,
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => assert(response.body, { id: 0, width: 5, height: 5 })))
});