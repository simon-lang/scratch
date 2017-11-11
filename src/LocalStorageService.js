const version = 1

class LocalStorageService {

    constructor(prefix, useVersion) {
        if (useVersion) {
            prefix = version + ':' + prefix
        }
        this.prefix = prefix
        this.store = {}
    }

    get(k) {
        if (this.prefix) {
            k = this.prefix + '.' + k
        }
        try {
            return JSON.parse(window.localStorage.getItem(k))
        } catch (e) {
            return this.store[k]
        }
    }

    set(k, v) {
        if (this.prefix) {
            k = this.prefix + '.' + k
        }
        try {
            return window.localStorage.setItem(k, JSON.stringify(v))
        } catch (e) {
            this.store[k] = v
        }
    }
}

module.exports = LocalStorageService
