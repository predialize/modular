"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Put = exports.Get = exports.Post = exports.Unsubscribe = exports.Unlock = exports.Trace = exports.Subscribe = exports.Search = exports.Report = exports.Purge = exports.Patch = exports.Notify = exports.Move = exports.MKcol = exports.MKactivity = exports.Merge = exports.Lock = exports.Head = exports.Copy = exports.Checkout = void 0;
const factory_1 = require("../../core/factory");
class MethodResolver {
    constructor(Target, propertyKey, descriptor, args, config) {
        Target.constructor[propertyKey] = { resolver: config.resolver, args, descriptor, propertyKey };
        return Target;
    }
}
exports.Checkout = factory_1.MethodFactory(MethodResolver, {
    resolver: 'checkout'
});
exports.Copy = factory_1.MethodFactory(MethodResolver, {
    resolver: 'copy'
});
exports.Head = factory_1.MethodFactory(MethodResolver, {
    resolver: 'head'
});
exports.Lock = factory_1.MethodFactory(MethodResolver, {
    resolver: 'lock'
});
exports.Merge = factory_1.MethodFactory(MethodResolver, {
    resolver: 'merge'
});
exports.MKactivity = factory_1.MethodFactory(MethodResolver, {
    resolver: 'mkactivity'
});
exports.MKcol = factory_1.MethodFactory(MethodResolver, {
    resolver: 'mkcol'
});
exports.Move = factory_1.MethodFactory(MethodResolver, {
    resolver: 'move'
});
exports.Notify = factory_1.MethodFactory(MethodResolver, {
    resolver: 'notify'
});
exports.Patch = factory_1.MethodFactory(MethodResolver, {
    resolver: 'patch'
});
exports.Purge = factory_1.MethodFactory(MethodResolver, {
    resolver: 'purge'
});
exports.Report = factory_1.MethodFactory(MethodResolver, {
    resolver: 'report'
});
exports.Search = factory_1.MethodFactory(MethodResolver, {
    resolver: 'search'
});
exports.Subscribe = factory_1.MethodFactory(MethodResolver, {
    resolver: 'subscribe'
});
exports.Trace = factory_1.MethodFactory(MethodResolver, {
    resolver: 'trace'
});
exports.Unlock = factory_1.MethodFactory(MethodResolver, {
    resolver: 'unlock'
});
exports.Unsubscribe = factory_1.MethodFactory(MethodResolver, {
    resolver: 'unsubscribe'
});
/**
 * Express Post Http Request
 * @param {string} path The endpoint disposed
 * @param {any} middlewares Any ordinary middleware
 * @returns {CallbackFn(request, response, next)} The decorated function
 */
exports.Post = factory_1.MethodFactory(MethodResolver, {
    resolver: 'post'
});
/**
 * Express Get Http Request
 * @param {string} path The endpoint disposed
 * @param {any} middlewares Any ordinary middleware
 * @returns {CallbackFn(request, response, next)} The decorated function
 */
exports.Get = factory_1.MethodFactory(MethodResolver, {
    resolver: 'get'
});
/**
 * Express Put Http Request
 * @param {string} path The endpoint disposed
 * @param {any} middlewares Any ordinary middleware
 * @returns {CallbackFn(request, response, next)} The decorated function
 */
exports.Put = factory_1.MethodFactory(MethodResolver, {
    resolver: 'put'
});
/**
 * Express Delete Http Request
 * @param {string} path The endpoint disposed
 * @param {any} middlewares Any ordinary middleware
 * @returns {CallbackFn(request, response, next)} The decorated function
 */
exports.Delete = factory_1.MethodFactory(MethodResolver, {
    resolver: 'delete'
});
//# sourceMappingURL=index.js.map