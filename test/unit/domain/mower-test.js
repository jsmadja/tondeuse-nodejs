const expect = require('chai').expect;
const Program = require('../../../lib/domain/program').Program;
const Mower = require('../../../lib/domain/mower');
const Lawn = require('../../../lib/domain/lawn');
const Position = require('../../../lib/domain/position');

describe('Mower', () => {

    const mower = new Mower('id');
    const lawn = new Lawn('id_lawn', 5, 5);

    it('should program a mower with valid G instruction', () => {
        const program = new Program(['G']);
        mower.putOnLawnAt(lawn, new Position(0, 0, 'N'));
        return mower.startProgram(program)
        .then(() => expect(mower.position).to.deep.equal({ x: 0, y: 0, orientation: 'W' }));
    });

    it('should program a mower with valid D instruction', () => {
        const program = new Program(['D']);
        mower.putOnLawnAt(lawn, new Position(0, 0, 'N'));
        return mower.startProgram(program)
        .then(() => expect(mower.position).to.deep.equal({ x: 0, y: 0, orientation: 'E' }));
    });

    it('should program a mower with valid A instruction', () => {
        const program = new Program(['A']);
        mower.putOnLawnAt(lawn, new Position(0, 0, 'N'));
        return mower.startProgram(program)
        .then(() => expect(mower.position).to.deep.equal({ x: 0, y: 1, orientation: 'N' }));
    });

    it('should program a mower with an invalid A instruction', () => {
        const program = new Program(['A']);
        mower.putOnLawnAt(lawn, new Position(5, 5, 'N'));
        return mower.startProgram(program)
        .then(() => expect(mower.position).to.deep.equal({ x: 5, y: 5, orientation: 'N' }));
    });

    it('should skip an invalid Z instruction', () => {
        const program = new Program(['Z']);
        mower.putOnLawnAt(lawn, new Position(5, 5, 'N'));
        return mower.startProgram(program)
        .then(() => expect(mower.position).to.deep.equal({ x: 5, y: 5, orientation: 'N' }));
    });

});
