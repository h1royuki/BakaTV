const KinogoParser = require('../../parsers/KinogoParser');

module.exports = async (data, socket) => {
    try {
        const json = await KinogoParser.getMovieJson(data.url);

        socket.emit('getSeriesJson', {id: data.id, json: json})
    }catch(err) {
        socket.emit('err', 'Error serial' + err.message);
    }
}