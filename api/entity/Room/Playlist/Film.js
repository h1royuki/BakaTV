
class Film {

    constructor(url, name, cover) {
        this.id = Date.now();
        this.url = url;
        this.name = name,
        this.time = 0;
        this.cover = cover;
        this.status = 'wait';
    }

}

module.exports = Film;