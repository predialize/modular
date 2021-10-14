"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterComponent = void 0;
const express_1 = require("express");
const buildConfig = (config) => {
    const middlewares = config ? [].concat(config) : [];
    const path = middlewares.length > 0 ? middlewares.splice(0, 1) : '';
    return { path, middlewares };
};
const configRouter = (moduleArgs, componentArgs) => {
    const module = buildConfig(moduleArgs);
    const component = buildConfig(componentArgs);
    const path = [module.path, component.path].join('');
    return [path].concat(module.middlewares, component.middlewares);
};
const getConfig = (moduleConfig, componentArgs) => {
    return moduleConfig.path
        ? configRouter([
            moduleConfig.path,
            moduleConfig.middlewares || ((req, res, next) => next())
        ], componentArgs)
        : componentArgs;
};
/** called on import class file */
exports.RouterComponent = (...componentArgs) => {
    /** called by decorator resolves */
    return (Target, config, options, customs, broadcast) => {
        /** called by router.module prepare children */
        return (moduleConfig, children) => {
            /** called by router.module on bind to app */
            return (parentRouter) => {
                const config = getConfig(moduleConfig, componentArgs);
                parentRouter.use(...config, (() => {
                    const router = express_1.Router({ mergeParams: true });
                    Object.values(Target).forEach((method) => {
                        if (method.descriptor) {
                            router[method.resolver](...method.args, (req, res, next) => {
                                const params = req.headers.params ? JSON.parse(req.headers.params) : {};
                                const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
                                req.locals = req.headers.locals ? JSON.parse(req.headers.locals) : {};
                                req.params = Object.assign({}, params, req.params);
                                const dependencies = options && options.injects
                                    ? options.injects.map((Dep) => new Dep({
                                        params: req.params,
                                        locals: req.locals,
                                        body: req.body,
                                        query: req.query,
                                        token
                                    }))
                                    : [];
                                const instance = new Target(...dependencies);
                                instance[method.propertyKey].apply(instance, [
                                    req,
                                    res,
                                    next
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
};
//# sourceMappingURL=router.component.js.map