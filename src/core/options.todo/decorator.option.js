"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DecoratorOption {
    constructor(key, targetName, dependencies) {
        this.key = key;
        this.targetName = targetName;
        this.dependencies = dependencies;
    }
    setValidation(validation) {
        this.checkValidation = () => {
            if (validation.if) {
                console.error(`${this.targetName} error: ${validation.throws}.`);
                process.exit(0);
            }
        };
    }
    getDependencies(behaviour, broadcast) {
        if (!this.dependencies ||
            (this.dependencies && this.dependencies.length === 0))
            return;
        return this.dependencies.map((DependencyResolver) => {
            if (DependencyResolver.behaviours &&
                !DependencyResolver.behaviours.some((b) => b === behaviour)) {
                console.error(`${this.targetName} error: ${DependencyResolver.targetName} ${DependencyResolver.type} has no ${behaviour} behaviour.`);
                process.exit(0);
            }
            return new DependencyResolver(broadcast);
        });
    }
}
exports.default = DecoratorOption;
//# sourceMappingURL=decorator.option.js.map