import { DependenciesResolver, ClassFactory } from '../factory';
import { INJECTABLE, RESOLVABLE, BINDABLE } from '../factory/behaviours';

class ComponentResolver extends DependenciesResolver {
   constructor(Target, config, options, customs, broadcast) {
      super(Target, config, options, customs, broadcast);      

      try {
         Target.prototype.customs = customs;

         if (options && options.injects && !(options.injects instanceof Array)) {
            console.error(
               `${Target.name} error: injects option must not be array type.`
            );
            process.exit(0);
         }

         if (!options) return new Target();

         Target = this.binds(options.binds, Target);      

         if (options.resolves) {
            return options.resolves(Target, config, options, customs, broadcast);
         } else {
            const injectables = this.resolve(options.injects, INJECTABLE, broadcast);

            return injectables ? new Target(...injectables) : new Target();
         }
      } catch(ex) {
         throw ex;
      }
   }
}

export const Component = ClassFactory({
   type: 'component',
   resolver: ComponentResolver,
   options: ['binds', 'injects', 'resolves'],
   behaviours: [INJECTABLE, RESOLVABLE]
});
