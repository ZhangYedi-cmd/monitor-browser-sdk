"use strict";
/**
 * 发布订阅
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscribe = void 0;
class Subscribe {
    dep = new Map();
    watch(eventName, callback) {
        let callbacks = this.dep.get(eventName);
        if (callbacks) {
            this.dep.set(eventName, callbacks.concat(callback));
            return;
        }
        this.dep.set(eventName, [callback]);
    }
    notify(eventName, args) {
        let callbacks = this.dep.get(eventName);
        callbacks && callbacks.length && callbacks.map(cb => cb(args));
    }
}
exports.Subscribe = Subscribe;
