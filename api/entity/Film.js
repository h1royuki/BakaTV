const process = require('process');


class Film {

    constructor( url, name, cover, season, desc) {
        
        this.id = process.hrtime()[0] * 1000000000 + process.hrtime()[1]
        this.url = url;
        this.name = name,
        this.season = season;
        this.desc = desc;
        this.cover = cover;
        this.time = 0;
        this.status = 'wait';
    }

}

module.exports = Film;