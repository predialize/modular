"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerProvider = void 0;
const core_1 = require("../src/core");
const api_1 = require("../src/api");
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
let ServerProvider = class ServerProvider {
    constructor() {
        this.use(body_parser_1.json({ limit: "50mb" }));
        this.use(body_parser_1.urlencoded({ limit: "50mb", extended: true }));
    }
    init(config = {}) {
        this.connection = this.listen(config.port, () => {
            console.info(`Api running at ::${config.port}.`);
        });
        this.get("/documentation", (req, res) => {
            const data = api_1.Router.metadata.getAll();
            res.send(data);
        });
    }
};
ServerProvider = __decorate([
    core_1.Provider({ binds: express_1.default() })
], ServerProvider);
exports.ServerProvider = ServerProvider;
//# sourceMappingURL=server.provider.js.map