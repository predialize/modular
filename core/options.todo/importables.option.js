"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_option_1 = __importDefault(require("./decorator.option"));
const behaviours_1 = require("../factory/behaviours");
class TImportables extends decorator_option_1.default {
    constructor() {
        super(...arguments);
        this.kind = behaviours_1.IMPORTABLE;
    }
}
exports.default = TImportables;
TImportables.dependsOn = behaviours_1.DECLARABLE;
//# sourceMappingURL=importables.option.js.map