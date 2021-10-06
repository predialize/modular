import Gateway from './gateway';
declare const Router: {
    module: (routes: any) => {
        new (): {};
    };
    component: (...componentArgs: any[]) => (Target: any, config: any, options: any, customs: any, broadcast: any) => (moduleConfig: any, children: any) => (parentRouter: any) => void;
};
export { Router, Gateway };
