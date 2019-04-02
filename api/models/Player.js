
class Player {
    constructor(url, name) {
        this.url = url;
        this.name = name,
        this.time = 0;
        this.status = 'play';
    }
}

module.exports = Player;