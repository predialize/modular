"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterModule = void 0;
const express_1 = require("express");
class RouterModuleResolver {
    constructor(routes) {
        this.build(routes);
    }
    mergeConfig(crr, prev) {
        if (!crr.children || crr.resolver)
            return crr;
        crr.middlewares = [].concat(crr.middlewares, prev.middlewares);
        crr.path += prev.path;
        return crr;
    }
    resolve(Route, children) {
        const defaultMiddleware = (req, res, next) => {
            const locals = req.headers.locals ? JSON.parse(req.headers.locals) : null;
            const params = req.headers.params ? JSON.parse(req.headers.params) : null;
            if (locals) {
                req.locals = Object.assign({}, req.locals, locals);
            }
            if (params) {
                req.params = Object.assign({}, req.params, params);
            }
            next();
        };
        const middlewares = Route.middlewares || [];
        return (router) => {
            router.use(Route.path || '/', ...middlewares.concat(defaultMiddleware), (() => {
                const rootRouter = express_1.Router({ mergeParams: true });
                children.forEach((child) => {
                    child && child(rootRouter);
                });
                return rootRouter;
            })());
        };
    }
    getResolver(Route) {
        return Route.resolver ? new Route.resolver() : new Route();
    }
    build(routes) {
        return routes.reduce((prev, Route) => {
            const children = Route.children && this.build(Route.children);
            if (Route && Route.path && !Route.resolver) {
                return prev.concat(this.resolve(Route, children));
            }
            const resolver = this.getResolver(Route);
            if (resolver && !resolver.listen) {
                return prev.concat(resolver(Route, children));
            }
            else if (resolver.listen) {
                return this.resolve(Route, children)(resolver);
            }
        }, []);
    }
}
exports.RouterModule = (routes) => class {
    constructor() {
        new RouterModuleResolver(routes);
    }
};
//# sourceMappingURL=router.module.js.map