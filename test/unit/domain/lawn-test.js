const expect = require('chai').expect;
const Lawn = require('../../../lib/domain/lawn');

describe('Lawn', () => {

    it('should return false if position is outside the lawn', () => {
        const lawn = new Lawn('id', 1, 1);
        expect(lawn.containsCoordinates(2, 2)).to.be.false;
        expect(lawn.containsCoordinates(3, 3)).to.be.false;
        expect(lawn.containsCoordinates(-1, -1)).to.be.false;
    });

    it('should return true if position is inside the lawn', () => {
        const lawn = new Lawn('id', 1, 1);
        expect(lawn.containsCoordinates(0, 0)).to.be.true;
        expect(lawn.containsCoordinates(0, 1)).to.be.true;
        expect(lawn.containsCoordinates(1, 0)).to.be.true;
        expect(lawn.containsCoordinates(1, 1)).to.be.true;
    });

});
