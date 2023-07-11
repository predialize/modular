import Gateway from "./gateway";
declare const Router: {
    module: (routes: any) => {
        new (): {};
    };
    component: (...componentArgs: any[]) => (Target: any, config: any, options: any, customs: any, broadcast: any) => (moduleArgs: any, children: any) => (appRouter: any, parentDefinition: any) => void;
    metadata: {
        getAll: () => {
            api: any;
            list: any[];
        };
        getApiMetadata: () => any;
        getList: () => any[];
        add: (currentRoute: any, parentRoute?: any, options?: {}) => any;
    };
};
export { Router, Gateway };
