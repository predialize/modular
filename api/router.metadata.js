"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    var routeList = [];
    var ApiMetadata;
    const getAll = () => ({ api: ApiMetadata, list: routeList });
    const getList = () => routeList;
    const getApiMetadata = () => ApiMetadata;
    const getByPath = (path) => routeList.find((t) => t.path === path);
    const getCurrent = (item) => {
        if (!item)
            return;
        if (typeof item === "string")
            return { path: item };
        return Object.assign({ path: item === null || item === void 0 ? void 0 : item.path }, ((item === null || item === void 0 ? void 0 : item.metadata) || {}));
    };
    const add = (currentRoute, parentRoute = null, options = {}) => {
        if (!currentRoute || currentRoute instanceof Function)
            return;
        const current = getCurrent(currentRoute);
        const parentNode = getByPath((parentRoute === null || parentRoute === void 0 ? void 0 : parentRoute.path) || parentRoute);
        const _a = parentNode || {}, { parent, api_metadata } = _a, parentMetadata = __rest(_a, ["parent", "api_metadata"]);
        const fullPath = [
            (parentMetadata === null || parentMetadata === void 0 ? void 0 : parentMetadata.full_path) || [],
            (current === null || current === void 0 ? void 0 : current.path) || [],
        ].join("");
        if (!parentRoute && !ApiMetadata) {
            ApiMetadata = current;
        }
        if (!fullPath)
            return;
        const metadata = Object.assign(Object.assign(Object.assign({ full_path: fullPath }, current), options), { api_metadata: ApiMetadata, parent: parentNode ? parentMetadata : null });
        routeList.push(metadata);
        return metadata;
    };
    return { getAll, getApiMetadata, getList, add };
})();
//# sourceMappingURL=router.metadata.js.map