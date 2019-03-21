
class Message {  
    constructor(type, id, name, message) {
        this.type = type;
        this.id = id,
        this.name = name;
        this.message = message;
    }

    toJson() {
        return {
            type : this.type,
            id : this.id,
            name: this.name,
            message: this.message
        }
    }
}

module.exports = Message;