const KinotochkaParser = require('../../parsers/KinotochkaParser');

module.exports = (query, socket) => {
        try {
            KinotochkaParser
            .searchFilms(query)
            .then((items) => {
                socket.emit('search', items);
            });
        } catch (err) {
                socket.emit('err', err.message);
        }

};