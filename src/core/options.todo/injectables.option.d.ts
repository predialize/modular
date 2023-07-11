import DecoratorOption from './decorator.option';
export default class TInjectables extends DecoratorOption {
    private kind;
    static dependsOn: string;
    constructor(key: any, targetName: any, dependencies: any);
}
