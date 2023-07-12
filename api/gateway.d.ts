declare class Node {
    app: any;
    host: any;
    path_rewrite: any;
    route: any;
    param: any;
    middlewares: any;
    parentNodes: any;
    children: any;
    constructor(app: any, params: any);
    getFullRoutes(): any;
    logger(route: any): () => {
        log: (str: any) => void;
        debug: (str: any) => void;
        info: () => void;
        warn: (str: any) => void;
        error: (str: any) => void;
    };
    setProxy(): void;
}
export default class Gateway {
    private app;
    private options;
    constructor(options?: any);
    getNode(options: any): Node;
    setProxy(tree: any): void;
    loadNodes(nodes: any, parent?: any): any;
    useProxy(nodes: any): void;
    listen(port: any, cb: any): void;
}
export {};
