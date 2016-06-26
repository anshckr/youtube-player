import { EventEmitter } from 'events';

export default class BaseStore extends EventEmitter {

    constructor (...args) {
        super(...args);
        this.data = new Set([]);
    }

    setAll (items, nextPageToken) {
        var existingItems = Array.from(this.data);
        if (existingItems.length) {
            // if there are already item in the list
            this.data = new Set(existingItems.concat(items));
        } else {
            this.data = new Set(items);
        }
        // save nextPageToken for further querying
        this.nextPageToken = nextPageToken;
        this.emitChange();
    }

    getAll () {
        return Array.from(this.data);
    }

    removeAll () {
        this.data = new Set([]);
        this.emitChange();
    }

    getNextPageToken () {
        return this.nextPageToken;
    }

    set (item) {
        if (!this.data.has(item)) {
            this.data.add(item);
            this.emitChange();
        }
    }

    remove (item) {
        this.data.delete(item);
        this.emitChange();
    }
}
