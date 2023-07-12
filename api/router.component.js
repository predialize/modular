"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterComponent = void 0;
const express_1 = require("express");
const router_metadata_1 = __importDefault(require("./router.metadata"));
/** called on import class file */
exports.RouterComponent = (...componentArgs) => {
    try {
        /** called by decorator resolves */
        return (Target, config, options, customs, broadcast) => {
            /** called by router.module prepare children */
            return (moduleArgs, children) => {
                /** called by router.module on bind to app */
                return (appRouter, parentDefinition) => {
                    const [componentArg, ...middlewares] = componentArgs || [];
                    const componentPath = (componentArg === null || componentArg === void 0 ? void 0 : componentArg.path) ? componentArg.path
                        : componentArg || [];
                    const componentMiddlewares = middlewares || (componentArg === null || componentArg === void 0 ? void 0 : componentArg.middlewares) || [];
                    const routePath = []
                        .concat((moduleArgs === null || moduleArgs === void 0 ? void 0 : moduleArgs.path) || [], componentPath)
                        .join("");
                    const routeMiddlewares = [].concat((moduleArgs === null || moduleArgs === void 0 ? void 0 : moduleArgs.middlewares) || [], componentMiddlewares);
                    const moduleArg = !moduleArgs || moduleArgs instanceof Function
                        ? parentDefinition
                        : moduleArgs;
                    const componentDefinition = router_metadata_1.default.add(componentArg, moduleArg);
                    appRouter.use(routePath, ...routeMiddlewares, (() => {
                        const router = express_1.Router({ mergeParams: true });
                        Object.values(Target).forEach((method) => {
                            if (method.descriptor) {
                                const [endpointArg, ...endpointMiddlewares] = method.args || [];
                                const endpointOptions = {
                                    endpoint: true,
                                    http_method: method.resolver,
                                    handler: method.propertyKey,
                                };
                                const endpointDefinition = router_metadata_1.default.add(endpointArg, componentDefinition || moduleArg || parentDefinition, endpointOptions);
                                const metadataMiddlewareInjector = (req, res, next) => {
                                    const { parent } = endpointDefinition, metadata = __rest(endpointDefinition, ["parent"]);
                                    req.route_metadata = metadata;
                                    next();
                                };
                                const middlewares = [].concat(metadataMiddlewareInjector, endpointMiddlewares || [], (endpointArg === null || endpointArg === void 0 ? void 0 : endpointArg.middlewares) || []);
                                router[method.resolver](endpointDefinition.path, ...middlewares, (req, res, next) => {
                                    const { params, authorization, locals } = (req === null || req === void 0 ? void 0 : req.headers) || {};
                                    const headerParams = params ? JSON.parse(params) : {};
                                    const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Bearer ", "");
                                    req.locals = locals ? JSON.parse(locals) : {};
                                    req.params = Object.assign({}, headerParams, req.params);
                                    const dependencies = ((options === null || options === void 0 ? void 0 : options.injects) || []).map((Dep) => new Dep({
                                        params: req.params,
                                        locals: req.locals,
                                        body: req.body,
                                        query: req.query,
                                        token,
                                    }));
                                    const instance = new Target(...dependencies);
                                    instance[method.propertyKey].apply(instance, [
                                        req,
                                        res,
                                        next,
                                    ]);
                                });
                            }
                        });
                        children && children.forEach((child) => child(router));
                        return router;
                    })());
                };
            };
        };
    }
    catch (ex) {
        throw ex;
    }
};
//# sourceMappingURL=router.component.js.map