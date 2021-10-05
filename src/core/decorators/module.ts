import {
   DependenciesResolver,
   ClassFactory,
   BootstrapFactory
} from '../factory';
import { IMPORTABLE, PROVIDABLE, INJECTABLE } from '../factory/behaviours';

class ModuleResolver extends DependenciesResolver {
   constructor(Target, config, options, customs, broadcast) {
      super(Target, config, options, customs, broadcast);

      Target.prototype.customs = customs;

      if (!options) return new Target();

      if (options.imports && !(options.imports instanceof Array)) {
         console.error(
            `${Target.name} error: import option must be array type.`
         );
         process.exit(0);
      }

      if (options.provides && !(options.provides instanceof Array)) {
         console.error(
            `${Target.name} error: provides option must be array type.`
         );
         process.exit(0);
      }

      if (options.declares && !(options.declares instanceof Array)) {
         console.error(
            `${Target.name} error: declares option must be array type.`
         );
         process.exit(0);
      }

      const providables = this.resolve(options.provides, PROVIDABLE, broadcast);
      const declarables = this.resolve(options.declares, INJECTABLE, broadcast);
      const importables = this.resolve(options.imports, IMPORTABLE, broadcast);

      return providables ? new Target(...providables) : new Target();
   }
}

const config = {
   type: 'module',
   resolver: ModuleResolver,
   options: ['declares', 'imports', 'provides'],
   behaviours: [IMPORTABLE]
};

export const Module = ClassFactory(config);
export const Bootstrap = BootstrapFactory(config);
