const Promise = require('bluebird');

class Mower {

    constructor(id) {
        this.id = id;
    }

    putOnLawnAt(lawn, position) {
        this.lawn = lawn;
        this._position = position;
    }

    startProgram(program) {
        return Promise.mapSeries(program.instructions, instruction => this.executeInstruction(instruction));
    }

    executeInstruction(instruction) {
        return Promise.resolve(instruction.applyTo(this))
        .then(() => Promise.delay(200));
    }

    set position(position) {
        if (this.lawn.containsCoordinates(position.x, position.y)) {
            this._position = position;
        }
    }

    get position() {
        return this._position;
    }

}

module.exports = Mower;