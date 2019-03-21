
class Message {  
    constructor(type, id, name, message, color) {
        this.type = type;
        this.id = id,
        this.name = name;
        this.message = message;
        this.color = color;
    }

    toJson() {
        return {
            type : this.type,
            id : this.id,
            name: this.name,
            message: this.message,
            color: this.color
        }
    }
}

module.exports = Message;