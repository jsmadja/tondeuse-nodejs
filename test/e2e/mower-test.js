const request = require('supertest-promised');
const app = require('../../lib/index');
const assert = require('assert');

describe('Mower', () => {
    it('should create a mower', () =>
        request(app)
        .post('/mower')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => assert(response.body, { id: 0 })));
});