const KinogoParser = require('../../parsers/KinogoParser')

module.exports = (query, socket) => {
    KinogoParser.searchFilms(query).then((items) => {
        socket.emit('searchFilms', items);
    }).catch((err) => {
        socket.emit('err', err.message);

    })
};