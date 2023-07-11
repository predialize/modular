"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bootstrap = exports.Module = void 0;
const factory_1 = require("../factory");
const behaviours_1 = require("../factory/behaviours");
class ModuleResolver extends factory_1.DependenciesResolver {
    constructor(Target, config, options, customs, broadcast) {
        super(Target, config, options, customs, broadcast);
        try {
            Target.prototype.customs = customs;
            if (!options)
                return new Target();
            if (options.imports && !(options.imports instanceof Array)) {
                console.error(`${Target.name} error: import option must be array type.`);
                process.exit(0);
            }
            if (options.provides && !(options.provides instanceof Array)) {
                console.error(`${Target.name} error: provides option must be array type.`);
                process.exit(0);
            }
            if (options.declares && !(options.declares instanceof Array)) {
                console.error(`${Target.name} error: declares option must be array type.`);
                process.exit(0);
            }
            const providables = this.resolve(options.provides, behaviours_1.PROVIDABLE, broadcast);
            const declarables = this.resolve(options.declares, behaviours_1.INJECTABLE, broadcast);
            const importables = this.resolve(options.imports, behaviours_1.IMPORTABLE, broadcast);
            return providables ? new Target(...providables) : new Target();
        }
        catch (ex) {
            throw ex;
        }
    }
}
const config = {
    type: "module",
    resolver: ModuleResolver,
    options: ["declares", "imports", "provides"],
    behaviours: [behaviours_1.IMPORTABLE],
};
exports.Module = factory_1.ClassFactory(config);
exports.Bootstrap = factory_1.BootstrapFactory(config);
//# sourceMappingURL=module.js.map