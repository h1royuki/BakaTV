const RutrackerParser = require('../../parsers/RutrackerParser');

module.exports = (query, socket) => {
    try {
        RutrackerParser.searchFilms(query).then((items) => {
            socket.emit('searchFilms', items);
        });
    } catch (err) {
        socket.emit('err', err.message);
    }
};