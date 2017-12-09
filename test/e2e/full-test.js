const assert = require('assert');
const { assertMowerIsAt } = require('../test-assert');
const { createLawn, createMower, putMowerOnLawn, sendMowerProgram, getMower } = require('../test-client');

describe('Full Test', () => {
    it('should mow a lawn Case 1', done => {
        let lawn;
        let mower;
        createLawn(5, 5)
        .then(response => lawn = response.body)
        .then(() => createMower()
        .then(response => mower = response.body))
        .then(() => putMowerOnLawn(lawn, mower, 1, 2, 'N'))
        .then(() => sendMowerProgram(mower, ['G', 'A', 'G', 'A', 'G', 'A', 'G', 'A', 'A']))
        .then(() => assertMowerIsAt(mower, done)(1, 3, 'N'));
    });

    it('should mow a lawn Case 2', done => {
        let lawn;
        let mower;
        createLawn(5, 5)
        .then(response => lawn = response.body)
        .then(() => createMower()
        .then(response => mower = response.body))
        .then(() => putMowerOnLawn(lawn, mower, 3, 3, 'E'))
        .then(() => sendMowerProgram(mower, ['A', 'A', 'D', 'A', 'A', 'D', 'A', 'D', 'D', 'A']))
        .then(() => assertMowerIsAt(mower, done)(5, 1, 'E'));
    });
});