
class Container {
    
    constructor() {
        this._items = [];
    }

    get(name) {
            return this._items[name];
        /* throw new Error(`Item ${item} not found in container`); */
    }

    set(name, value) {
        console.log(name);
        this._items[name] = value;
    }
}

module.exports = new Container();