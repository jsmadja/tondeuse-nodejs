const assert = require('assert');
const { createLawn, createMower, putMowerOnLawn, sendMowerProgram, getMower } = require('../test-client');

describe('Basic Test', () => {
    it('should mow a lawn', () => {
        let lawn;
        let mower;
        return createLawn()
        .then(response => lawn = response.body)
        .then(() => createMower()
        .then(response => mower = response.body))
        .then(() => putMowerOnLawn(lawn, mower))
        .then(() => sendMowerProgram(mower))
        .then(() => getMower(mower))
        .then(res => assert.deepEqual(res.body,
            {
                id: mower.id,
                lawn,
                _position: { x: 0, y: 1, orientation: 'N' }
            }));
    });
});