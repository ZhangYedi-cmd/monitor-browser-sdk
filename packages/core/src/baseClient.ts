import {BasePluginType, CoreContentType} from "./types";
import {Subscribe} from "./lib/subscribe";

/**
 * 核心内核
 */

export abstract class Core <O extends CoreContentType>{
    private readonly options: O
    private content
    public taskQueue

    constructor(options: O) {
        this.options = options
    }

    use(plugins: BasePluginType[]) {
        let sub = new Subscribe()
        plugins.map(plugin => {
            plugin.monitor.call(this, sub.notify.bind(sub, plugin.name));
            let callback = (...args) => {
                let data = plugin.transform({...args})
                if (!data) {
                    return
                }
                // 日志上报
            }
            sub.watch(plugin.name, callback)
        })
    }
}



