const rp = require('request-promise');
const _ = require('lodash');

class RestClient {

    constructor(apiEndPoint = '') {
        this.apiEndPoint = apiEndPoint;
    }

    _rp(route) {
        return rp({
            uri: `${this.apiEndPoint + route}`,
            json: true,
        });
    }

    post(route, body) {
        return this._rp(route, {
            method: 'POST',
            body
        });
    }
}

module.exports = RestClient;
