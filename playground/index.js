"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const core_1 = require("../src/core");
const api_1 = require("../src/api");
const server_provider_1 = require("./server.provider");
const router_1 = require("./router");
const RouterModule = api_1.Router.module([
    {
        resolver: server_provider_1.ServerProvider,
        children: [router_1.AppRouter],
    },
]);
let AppModule = class AppModule {
    constructor(app) {
        this.app = app;
        this.app.init({ port: 4000 });
    }
};
AppModule = __decorate([
    core_1.Bootstrap({
        provides: [server_provider_1.ServerProvider],
        imports: [RouterModule],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=index.js.map