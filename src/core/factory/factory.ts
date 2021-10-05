const ClassFactory = (decoratorSettings) => {
   return (defaultOptions = null, customOptions = null) => {
      return (Target) => {         
         /** Object.assign: hacks Target's dynamic private properties */
         return Object.assign(
            class {
               constructor(broadcast) {
                  return new decoratorSettings.resolver(
                     Target,
                     decoratorSettings,
                     defaultOptions,
                     customOptions,
                     broadcast
                  );
               }
            }
         );
      };
   };
};

const MethodFactory = (Resolver, config) => {
   return (...args) => {
      return (Target, propertyKey, descriptor) => {
         return new Resolver(Target, propertyKey, descriptor, args, config);
      };
   };
};

const BootstrapFactory = (config) => {
   return (args) => {
      return (Target) => {
         return new config.resolver(Target, config, args);
      };
   };
};

export {
   ClassFactory,
   BootstrapFactory,
   MethodFactory
};
