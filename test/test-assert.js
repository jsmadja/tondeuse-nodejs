const waitUntil = require('wait-until');
const { getMower } = require('./test-client');

module.exports = {
    assertMowerIsAt: (mower, done) => (x, y, orientation) =>
        waitUntil()
        .interval(200)
        .times(10)
        .condition((cb) =>
            getMower(mower)
            .then(res => {
                const position = res.body._position;
                return cb(position.x === x && position.y === y && position.orientation === orientation);
            }))
        .done(valid => valid ? done() : done(new Error(`Mower is not at (${x},${y},${orientation})`)))
};
