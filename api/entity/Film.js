const process = require('process');


class Film {

    constructor(id, url, name, cover, season, desc) {
        
        this.id = id;
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