const parser = require('./parsers/KinogoParser');


parser.searchFilms('Алита').then((items) => {
    parser.getMovieURL(items[0].url).then((url) => {
        console.log(url);
    }).catch((err) => {
        console.log(err);
    })
})
