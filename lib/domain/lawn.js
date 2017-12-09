class Lawn {

    constructor(id, width, height) {
        this.id = id;
        this.width = width;
        this.height = height;
    }

    containsCoordinates(x, y) {
        return this.width >= x && x >= 0 && this.height >= y && y >= 0;
    }

}

module.exports = Lawn;