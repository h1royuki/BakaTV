
class Playlist {

    constructor(film) {
        this.films = [];
        this.films.push(film);
        this.current = 0;
    }
}

module.exports = Playlist;