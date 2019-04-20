class User {
    constructor(socketId, name, color) {
        this.id = Math.floor(Math.random() * 1000000);
        this.socketId = socketId;
        this.name = name;
        this.color = color;
    }
}

module.exports = User;