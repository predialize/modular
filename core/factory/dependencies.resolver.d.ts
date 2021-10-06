export default class DependenciesResolver {
    protected Target: any;
    protected targetName: any;
    protected config: any;
    customs: any;
    constructor(Target: any, config: any, options: any, customs: any, broadcast: any);
    validateOptions(options: any): void;
    resolve(dependencies: any, behaviour: any, broadcast: any): any;
    binds(evaluation: any, Target: any): any;
}
