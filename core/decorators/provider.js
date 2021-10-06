"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = exports.Register = void 0;
const factory_1 = require("../factory");
const behaviours_1 = require("../factory/behaviours");
var providers = [];
exports.Register = ((providers) => {
    const get = (name) => {
        return providers.find((provider) => {
            return provider.constructor.name === name;
        });
    };
    const add = (provider) => {
        if (!get(provider.constructor.name)) {
            providers.push(provider);
        }
    };
    return { get, add };
})(providers);
class ProviderResolver extends factory_1.DependenciesResolver {
    constructor(Target, config, options, customs, broadcast) {
        super(Target, config, options, customs, broadcast);
        this.options = options;
        this.broadcast = broadcast;
        Target.prototype.customs = customs;
        if (options && options.declares instanceof Array) {
            console.error(`${Target.name} error: a provider must not be array type.`);
            process.exit(0);
        }
        return exports.Register.get(Target.name) || this.makeNew();
    }
    makeNew() {
        if (!this.options)
            return new this.Target();
        const injectables = this.resolve(this.options.injects, behaviours_1.PROVIDABLE, this.broadcast);
        this.Target = this.binds(this.options.binds, this.Target);
        const provider = injectables
            ? new this.Target(...injectables)
            : new this.Target();
        exports.Register.add(provider);
        return provider;
    }
}
exports.Provider = factory_1.ClassFactory({
    type: 'provider',
    resolver: ProviderResolver,
    options: ['binds', 'injects'],
    behaviours: [behaviours_1.INJECTABLE, behaviours_1.PROVIDABLE]
});
//# sourceMappingURL=provider.js.map