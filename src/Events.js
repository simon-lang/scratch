// 1. Support subscribing to events.
// sub = emitter.subscribe('event_name', callback);
// sub2 = emitter.subscribe('event_name', callback2);

// 2. Support emitting events.
// This particular example should lead to the `callback` above being invoked with `foo` and `bar` as parameters.
// emitter.emit('event_name', foo, bar);

// 3. Support unsubscribing existing subscriptions by releasing them.
// sub.release(); // `sub` is the reference returned by `subscribe` above

class EventEmitter {
    on(event, handler) {
        if (!this.handlers[event]) {
            this.handlers[event] = []
        }
        this.handlers[event].push(handler)
    }
    off(event, handler) {
        let handlers = this.handlers[event] || this.handlers[event]

        // REDUCE! just remind myself on splice
        // this.handlers[event] = this.handlers[event].reduce((previousValue, currentValue) => {

        // }, acc)
    }
    trigger(event, ...args) {
        const handlers = this.handlers[event] || []
        handlers.forEach(handler => hanlder(...args))
    }
}
