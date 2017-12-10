const request = require('supertest-promised');
const app = require('../lib/index');

module.exports = {

    createLawn: (width = 5, height = 5) => request(app).post('/lawn').send({ width, height }),

    createMower: () => request(app).post('/mower'),

    getMower: (mower) => request(app).get(`/mower/${mower.id}`),

    putMowerOnLawn: (lawn, mower, x = 0, y = 0, orientation = 'N') =>
        request(app).post(`/lawn/${lawn.id}/mowers`)
        .send({
            mower_id: mower.id,
            x,
            y,
            orientation
        }),

    sendMowerProgram: (mower, instructions = ['A']) =>
        request(app).put(`/mower/${mower.id}`)
        .send(instructions)

};
