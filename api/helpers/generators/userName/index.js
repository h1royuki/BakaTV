const adjectives = require('./library/adjectives');
const names = require('./library/names');

function generate() {
    let adjective = getRandomElement(adjectives);
    let name = getRandomElement(names);

    adjective = adjective.charAt(0).toUpperCase() + adjective.slice(1);
    
    return `${adjective} ${name}`;
}

function getRandomElement(array) {
    let random = Math.floor(Math.random()*array.length);
    return array[random];
}

module.exports = generate;