"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
const factory_1 = require("../factory");
const behaviours_1 = require("../factory/behaviours");
class ComponentResolver extends factory_1.DependenciesResolver {
    constructor(Target, config, options, customs, broadcast) {
        super(Target, config, options, customs, broadcast);
        try {
            Target.prototype.customs = customs;
            if (options && options.injects && !(options.injects instanceof Array)) {
                console.error(`${Target.name} error: injects option must not be array type.`);
                process.exit(0);
            }
            if (!options)
                return new Target();
            Target = this.binds(options.binds, Target);
            if (options.resolves) {
                return options.resolves(Target, config, options, customs, broadcast);
            }
            else {
                const injectables = this.resolve(options.injects, behaviours_1.INJECTABLE, broadcast);
                return injectables ? new Target(...injectables) : new Target();
            }
        }
        catch (ex) {
            throw ex;
        }
    }
}
exports.Component = factory_1.ClassFactory({
    type: 'component',
    resolver: ComponentResolver,
    options: ['binds', 'injects', 'resolves'],
    behaviours: [behaviours_1.INJECTABLE, behaviours_1.RESOLVABLE]
});
//# sourceMappingURL=component.js.map