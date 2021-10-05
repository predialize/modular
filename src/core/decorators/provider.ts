import { DependenciesResolver, ClassFactory } from '../factory';
import { PROVIDABLE, INJECTABLE, BINDABLE } from '../factory/behaviours';

var providers = [];

export const Register = ((providers) => {
   const get = (name) => {
      return providers.find((provider) => {
         return provider.constructor.name === name;
      });
   };

   const add = (provider) => {
      if (!get(provider.constructor.name)) {
         providers.push(provider);
      }
   };

   return { get, add };
})(providers);

class ProviderResolver extends DependenciesResolver {
   constructor(
      Target,
      config,
      private options,
      customs,
      private broadcast
   ) {
      super(Target, config, options, customs, broadcast);

      Target.prototype.customs = customs;

      if (options && options.declares instanceof Array) {
         console.error(
            `${Target.name} error: a provider must not be array type.`
         );
         process.exit(0);
      }

      return Register.get(Target.name) || this.makeNew();
   }

   makeNew() {
      if (!this.options) return new this.Target();

      const injectables = this.resolve(
         this.options.injects,
         PROVIDABLE,
         this.broadcast
      );

      this.Target = this.binds(this.options.binds, this.Target);

      const provider = injectables
         ? new this.Target(...injectables)
         : new this.Target();

      Register.add(provider);

      return provider;
   }
}

export const Provider = ClassFactory({
   type: 'provider',
   resolver: ProviderResolver,
   options: ['binds', 'injects'],
   behaviours: [INJECTABLE, PROVIDABLE]
});
