class Repository {

    constructor() {
        this.lawns = [];
        this.mowers = [];
    }

    nextLawnId() {
        return this.lawns.length + 1;
    }

    saveLawn(lawn) {
        this.lawns.push(lawn);
        return lawn;
    }

    getLawnById(id) {
        return this.lawns[id - 1];
    }

    nextMowerId() {
        return this.mowers.length + 1;
    }


    saveMower(mower) {
        this.mowers.push(mower);
    }

    getMowerById(id) {
        return this.mowers[id - 1];
    }

}

module.exports = new Repository();