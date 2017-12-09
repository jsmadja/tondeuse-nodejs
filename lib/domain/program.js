const Position = require('./position');

const leftOf = { 'N': 'W', 'W': 'S', 'S': 'E', 'E': 'N' };
const rightOf = { 'N': 'E', 'E': 'S', 'S': 'W', 'W': 'N' };

const Commands = {
    'A': {
        name: 'A',
        description: 'Advance in a direction',
        applyTo: mower => {
            let position;
            switch (mower.position.orientation) {
                case 'N':
                    position = new Position(mower.position.x, mower.position.y + 1, mower.position.orientation);
                    break;
                case 'E':
                    position = new Position(mower.position.x + 1, mower.position.y, mower.position.orientation);
                    break;
                case 'W':
                    position = new Position(mower.position.x - 1, mower.position.y, mower.position.orientation);
                    break;
                case 'S':
                    position = new Position(mower.position.x, mower.position.y - 1, mower.position.orientation);
                    break;
            }
            mower.position = position;
        }
    },
    'G': {
        name: 'G',
        description: 'Turn left',
        applyTo: mower => mower.position = new Position(mower.position.x, mower.position.y, leftOf[mower.position.orientation])
    },
    'D': {
        name: 'D',
        description: 'Turn right',
        applyTo: mower => mower.position = new Position(mower.position.x, mower.position.y, rightOf[mower.position.orientation])
    }
};

class Program {

    constructor(instructions) {
        this.instructions = instructions.map(instruction => Commands[instruction]);
    }

}

module.exports = Program;