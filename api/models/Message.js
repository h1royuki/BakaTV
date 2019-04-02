
class Message {  
    constructor(type, user_id, user_name, message, user_color) {
        this.type = type;
        this.user_id = user_id,
        this.user_name = user_name;
        this.message = message;
        this.user_color = user_color
    }

    toJson() {
        return {
            type : this.type,
            id : this.user_id,
            name: this.user_name,
            message: this.message,
            color: this.user_color
        }
    }
}

module.exports = Message;