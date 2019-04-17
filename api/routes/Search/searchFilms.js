const KinogoParser = require('../../parsers/KinogoParser')

module.exports = async (query, socket) => {
    try {
        const items = await KinogoParser.searchFilms(query)
        
        socket.emit('searchFilms', items);
    } catch (err) {
        console.log(err);
        socket.emit('err', err.message);
    }
};