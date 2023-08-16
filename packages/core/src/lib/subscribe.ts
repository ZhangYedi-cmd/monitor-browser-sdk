/**
 * 发布订阅
 */

export class Subscribe {
    dep: Map<string,any> = new Map()

    watch(eventName: string, callback: (data: any) => any) {
        let callbacks = this.dep.get(eventName)
        if (callbacks) {
            this.dep.set(
                eventName,
                callbacks.concat(callback)
            )
            return
        }
        this.dep.set(
            eventName,
            [callback]
        )
    }

    notify<D = any>(eventName: string, args?: D) {
        let callbacks = this.dep.get(eventName)
        callbacks && callbacks.length && callbacks.map(cb => cb(args))
    }
}

