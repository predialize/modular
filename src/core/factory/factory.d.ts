declare const ClassFactory: (decoratorSettings: any) => (defaultOptions?: any, customOptions?: any) => (Target: any) => any;
declare const MethodFactory: (Resolver: any, config: any) => (...args: any[]) => (Target: any, propertyKey: any, descriptor: any) => any;
declare const BootstrapFactory: (config: any) => (args: any) => (Target: any) => any;
export { ClassFactory, BootstrapFactory, MethodFactory };
