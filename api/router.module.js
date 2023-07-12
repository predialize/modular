"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterModule = void 0;
const express_1 = require("express");
const router_metadata_1 = __importDefault(require("./router.metadata"));
var parseRequestQuery = (query) => {
    try {
        var parseTraverse = (query) => {
            return Object.keys(query).reduce((prev, key) => {
                const hasArrayInString = query[key] && query[key][0] == "[";
                const hasObjectInString = query[key] && query[key][0] == "{";
                var value = hasArrayInString || hasObjectInString
                    ? JSON.parse(query[key])
                    : query[key];
                var parseWhenObjectShouldBeArray = (item) => {
                    const childKeys = Object.keys(item);
                    const isFalseArray = (child) => child instanceof Object &&
                        !(child instanceof Array) &&
                        Object.keys(child).some((attr) => attr === "0" || attr === "[0]");
                    return childKeys.reduce((prev, childKey) => {
                        if (isFalseArray(item[childKey])) {
                            const val = {
                                [childKey]: Object.keys(item[childKey]).reduce((p, c) => p.concat(item[childKey][c]), []),
                            };
                            return Object.assign({}, prev, val);
                        }
                        return Object.assign({}, prev, { [childKey]: item[childKey] });
                    }, {});
                };
                const data = (() => {
                    if (typeof value === "object") {
                        if (value instanceof Array) {
                            const arrVal = value.map((val) => typeof val === "object" ? parseTraverse(val) : val);
                            return { [key]: arrVal };
                        }
                        else {
                            const val = parseWhenObjectShouldBeArray(value);
                            return { [key]: parseTraverse(val) };
                        }
                    }
                    else if (!isNaN(Number(value))) {
                        return { [key]: Number(value) };
                    }
                    else if (["true", "false"].includes(value)) {
                        return { [key]: value === "true" };
                    }
                    else {
                        return { [key]: value === "null" ? null : value };
                    }
                })();
                return Object.assign({}, prev, data);
            }, {});
        };
        return parseTraverse(query);
    }
    catch (ex) {
        console.log("Router Module Exception - parseRequestQuery");
        console.log(ex);
    }
};
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
    resolve(Route, children, parentRoute) {
        const defaultMiddleware = (req, res, next) => {
            const locals = req.headers.locals ? JSON.parse(req.headers.locals) : null;
            const params = req.headers.params ? JSON.parse(req.headers.params) : null;
            if (locals) {
                req.locals = Object.assign({}, req.locals, locals);
            }
            if (params) {
                req.params = Object.assign({}, req.params, params);
            }
            if (req.query) {
                req.query = parseRequestQuery(req.query);
            }
            next();
        };
        const middlewares = Route.middlewares || [];
        return (router) => {
            router.use(Route.path || "/", ...[].concat(defaultMiddleware, middlewares), (() => {
                const rootRouter = express_1.Router({ mergeParams: true });
                children.forEach((child) => {
                    child && child(rootRouter, parentRoute);
                });
                return rootRouter;
            })());
        };
    }
    getResolver(Route) {
        return Route.resolver ? new Route.resolver() : new Route();
    }
    build(routes, parentRoute = null) {
        return routes.reduce((prev, Route) => {
            const routeMetadata = router_metadata_1.default.add(Route, parentRoute);
            const children = Route.children && this.build(Route.children, routeMetadata);
            if (Route && Route.path && !Route.resolver) {
                return prev.concat(this.resolve(Route, children, routeMetadata));
            }
            const resolver = this.getResolver(Route);
            if (resolver && !resolver.listen) {
                return prev.concat(resolver(Route, children, routeMetadata));
            }
            else if (resolver.listen) {
                return this.resolve(Route, children, routeMetadata)(resolver);
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