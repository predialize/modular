"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TBindables {
    constructor() {
        this.kind = 'BINDALBLE';
    }
    set(evaluation, Target) {
        if (!evaluation)
            return Target;
        Object.getOwnPropertyNames(evaluation).forEach((key) => {
            try {
                Target.prototype[key] =
                    Target.prototype[key] || evaluation[key].bind(evaluation);
            }
            catch (ex) {
                try {
                    Target.prototype[key] = Target.prototype[key] || evaluation[key];
                }
                catch (ex) {
                    /** deprecated methods */
                }
            }
        });
        Object.getOwnPropertyNames(Object.getPrototypeOf(evaluation)).forEach((key) => {
            try {
                Target.prototype[key] =
                    Target.prototype[key] || evaluation[key].bind(evaluation);
            }
            catch (ex) {
                try {
                    Target.prototype[key] =
                        Target.prototype[key] || evaluation[key];
                }
                catch (ex) {
                    /** deprecated methods */
                }
            }
        });
        return Target;
    }
}
exports.default = TBindables;
//# sourceMappingURL=bindables.option.js.map