(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.HEIMDALLR_CORE = {}));
})(this, (function (exports) { 'use strict';

    class Subscribe {
      constructor() {
        this.dep = /* @__PURE__ */ new Map();
      }
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
        callbacks && callbacks.length && callbacks.map((cb) => cb(args));
      }
    }

    var __defProp = Object.defineProperty;
    var __getOwnPropSymbols = Object.getOwnPropertySymbols;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __propIsEnum = Object.prototype.propertyIsEnumerable;
    var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __spreadValues = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      if (__getOwnPropSymbols)
        for (var prop of __getOwnPropSymbols(b)) {
          if (__propIsEnum.call(b, prop))
            __defNormalProp(a, prop, b[prop]);
        }
      return a;
    };
    class Core {
      constructor(options) {
        this.options = options;
      }
      use(plugins) {
        let sub = new Subscribe();
        plugins.map((plugin) => {
          plugin.monitor.call(this, sub.notify.bind(sub, plugin.name));
          let callback = (...args) => {
            let data = plugin.transform(__spreadValues({}, args));
            if (!data) {
              return;
            }
          };
          sub.watch(plugin.name, callback);
        });
      }
    }

    exports.Core = Core;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
/* follow me on Github! @LuciferHuang */
