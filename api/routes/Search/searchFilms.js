const KinogoParser = require('../../parsers/KinogoParser')

module.exports = async (query, socket) => {
    try {
        const items = await KinogoParser.searchFilms(query)
        
        socket.emit('searchFilms', items);
    } catch (err) {
        
        socket.emit('err', 'Search error: ' + err.message);
    }
};