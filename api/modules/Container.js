
class Container {

    constructor() {
        this._items = [];
    }

    get(name) {
        return this._items[name];
    }

    set(name, value) {
        this._items[name] = value;
    }
}

module.exports = new Container();