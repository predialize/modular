"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_option_1 = __importDefault(require("./decorator.option"));
const behaviours_1 = require("../factory/behaviours");
class TProvidables extends decorator_option_1.default {
    constructor(key, targetName, dependencies) {
        super(key, targetName, dependencies);
        this.kind = behaviours_1.PROVIDABLE;
        this.setValidation({
            if: !(dependencies instanceof Array),
            throws: `${key} option must to be an instance of array.`
        });
    }
}
exports.default = TProvidables;
//# sourceMappingURL=providables.option.js.map