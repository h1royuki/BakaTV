module.exports = (url) => {

    let urlSplitted = url.split('.');

     let lastElement = urlSplitted.length - 1;

    return urlSplitted[lastElement];
};

