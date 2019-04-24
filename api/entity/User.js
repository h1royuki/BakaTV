const userNameGenerator = require('../helpers/generators/userName');
const colorGenerator = require('../helpers/generators/color');

class User {
    constructor() {
        this.name = userNameGenerator();
        this.color =  colorGenerator();
    }
}

module.exports = User;