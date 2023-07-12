"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gateway = exports.Router = void 0;
const router_module_1 = require("./router.module");
const router_component_1 = require("./router.component");
const gateway_1 = __importDefault(require("./gateway"));
exports.Gateway = gateway_1.default;
const router_metadata_1 = __importDefault(require("./router.metadata"));
const Router = {
    module: router_module_1.RouterModule,
    component: router_component_1.RouterComponent,
    metadata: router_metadata_1.default,
};
exports.Router = Router;
//# sourceMappingURL=index.js.map