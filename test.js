const parser = require('./api/parsers/KinogoParser');

const url = `https://kinogo.by/15292-nesokrushimyy_2018__24-01.html`;


parser.searchFilms('Южный парк').then((items) => {
    console.log(items);
});