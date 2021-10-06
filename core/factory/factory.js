"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodFactory = exports.BootstrapFactory = exports.ClassFactory = void 0;
const ClassFactory = (decoratorSettings) => {
    return (defaultOptions = null, customOptions = null) => {
        return (Target) => {
            /** Object.assign: hacks Target's dynamic private properties */
            return Object.assign(class {
                constructor(broadcast) {
                    return new decoratorSettings.resolver(Target, decoratorSettings, defaultOptions, customOptions, broadcast);
                }
            });
        };
    };
};
exports.ClassFactory = ClassFactory;
const MethodFactory = (Resolver, config) => {
    return (...args) => {
        return (Target, propertyKey, descriptor) => {
            return new Resolver(Target, propertyKey, descriptor, args, config);
        };
    };
};
exports.MethodFactory = MethodFactory;
const BootstrapFactory = (config) => {
    return (args) => {
        return (Target) => {
            return new config.resolver(Target, config, args);
        };
    };
};
exports.BootstrapFactory = BootstrapFactory;
//# sourceMappingURL=factory.js.map