export default class DecoratorOption {
    private key;
    private targetName;
    private dependencies;
    private checkValidation;
    constructor(key: any, targetName: any, dependencies: any);
    setValidation(validation: any): void;
    getDependencies(behaviour: any, broadcast: any): any;
}
