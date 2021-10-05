import { MethodFactory } from '../../core/factory';

class MethodResolver {
   constructor(Target, propertyKey, descriptor, args, config) {
      Target.constructor[propertyKey] = { resolver: config.resolver, args, descriptor, propertyKey }
      
      return Target;
   }
}

export const Checkout = MethodFactory(MethodResolver, {
   resolver: 'checkout'
});

export const Copy = MethodFactory(MethodResolver, {
   resolver: 'copy'
});

export const Head = MethodFactory(MethodResolver, {
   resolver: 'head'
});

export const Lock = MethodFactory(MethodResolver, {
   resolver: 'lock'
});

export const Merge = MethodFactory(MethodResolver, {
   resolver: 'merge'
});

export const MKactivity = MethodFactory(MethodResolver, {
   resolver: 'mkactivity'
});

export const MKcol = MethodFactory(MethodResolver, {
   resolver: 'mkcol'
});

export const Move = MethodFactory(MethodResolver, {
   resolver: 'move'
});

export const Notify = MethodFactory(MethodResolver, {
   resolver: 'notify'
});

export const Patch = MethodFactory(MethodResolver, {
   resolver: 'patch'
});

export const Purge = MethodFactory(MethodResolver, {
   resolver: 'purge'
});

export const Report = MethodFactory(MethodResolver, {
   resolver: 'report'
});

export const Search = MethodFactory(MethodResolver, {
   resolver: 'search'
});

export const Subscribe = MethodFactory(MethodResolver, {
   resolver: 'subscribe'
});

export const Trace = MethodFactory(MethodResolver, {
   resolver: 'trace'
});

export const Unlock = MethodFactory(MethodResolver, {
   resolver: 'unlock'
});

export const Unsubscribe = MethodFactory(MethodResolver, {
   resolver: 'unsubscribe'
});

/**
 * Express Post Http Request
 * @param {string} path The endpoint disposed
 * @param {any} middlewares Any ordinary middleware
 * @returns {CallbackFn(request, response, next)} The decorated function
 */
export const Post = MethodFactory(MethodResolver, {
   resolver: 'post'
});

/**
 * Express Get Http Request
 * @param {string} path The endpoint disposed
 * @param {any} middlewares Any ordinary middleware
 * @returns {CallbackFn(request, response, next)} The decorated function
 */
export const Get = MethodFactory(MethodResolver, {
   resolver: 'get'
});

/**
 * Express Put Http Request
 * @param {string} path The endpoint disposed
 * @param {any} middlewares Any ordinary middleware
 * @returns {CallbackFn(request, response, next)} The decorated function
 */
export const Put = MethodFactory(MethodResolver, {
   resolver: 'put'
});

/**
 * Express Delete Http Request
 * @param {string} path The endpoint disposed
 * @param {any} middlewares Any ordinary middleware
 * @returns {CallbackFn(request, response, next)} The decorated function
 */
export const Delete = MethodFactory(MethodResolver, {
   resolver: 'delete'
});