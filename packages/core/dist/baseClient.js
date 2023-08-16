"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Core = void 0;
const subscribe_1 = require("./lib/subscribe");
/**
 * 核心内核
 */
class Core {
    options;
    content;
    taskQueue;
    constructor(options) {
        this.options = options;
    }
    use(plugins) {
        let sub = new subscribe_1.Subscribe();
        plugins.map(plugin => {
            plugin.monitor.call(this, sub.notify.bind(sub, plugin.name));
            let callback = (...args) => {
                let data = plugin.transform({ ...args });
                if (!data) {
                    return;
                }
                // 日志上报
            };
            sub.watch(plugin.name, callback);
        });
    }
}
exports.Core = Core;
