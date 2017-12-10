const Promise = require('bluebird');
const _ = require('lodash');

class Mower {

    constructor(id, speed = 200) {
        this.id = id;
        this.speed = speed;
    }

    putOnLawnAt(lawn, position) {
        this.lawn = lawn;
        this._position = position;
    }

    startProgram(program) {
        return Promise.mapSeries(program.instructions, instruction => this._executeInstruction(instruction));
    }

    _executeInstruction(instruction) {
        return Promise.resolve(instruction.applyTo(this))
        .then(() => Promise.delay(this.speed));
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