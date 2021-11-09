export default class DependenciesResolver {
   protected targetName;
   protected config;
   public customs;

   constructor(protected Target, config, options, customs, broadcast) {            
      this.targetName = Target.name;
      this.config = config;
      this.customs = customs;
      this.Target.prototype.customs = customs;

      this.validateOptions(options);
   }

   validateOptions(options) {
      try {
         if (options && this.config.options) {
            const keys = Object.keys(options);
            let error;

            for (let i = 0; i < keys.length; i++) {
               if (
                  this.config.options &&
                  !this.config.options.some((ak) => ak === keys[i])
               ) {
                  error = `${this.targetName} error: options ${keys[i]} is not valid for ${this.config.type}'s decorator type.`;
               }
            }

            if (error) throw error;
         }
      } catch(ex) {
         throw ex;
      }
   }

   resolve(dependencies, behaviour, broadcast) {
      try {
         if (!dependencies || (dependencies && dependencies.length === 0)) return;

         return dependencies.map((DependencyResolver) => {
            if (
               DependencyResolver.behaviours &&
               !DependencyResolver.behaviours.some((b) => b === behaviour)
            ) {
               throw `${this.targetName} error: ${DependencyResolver.targetName} ${DependencyResolver.type} has no ${behaviour} behaviour.`;
            }

            return new DependencyResolver(broadcast);
         });
      } catch(ex) {
         console.log(ex)
         throw `${this.targetName}: one of the dependencies could not be injected: ${JSON.stringify(ex)}. `;
      } 
   }

   binds(evaluation, Target) {
      if (!evaluation) return Target;

      Object.getOwnPropertyNames(evaluation).forEach((key) => {
         try {
            Target.prototype[key] =
               Target.prototype[key] || evaluation[key].bind(evaluation);
         } catch (ex) {
            try {
               Target.prototype[key] = Target.prototype[key] || evaluation[key];
            } catch (ex) {
               /** deprecated methods */
            }
         }
      });

      Object.getOwnPropertyNames(Object.getPrototypeOf(evaluation)).forEach(
         (key) => {
            try {
               Target.prototype[key] =
                  Target.prototype[key] || evaluation[key].bind(evaluation);
            } catch (ex) {
               try {
                  Target.prototype[key] =
                     Target.prototype[key] || evaluation[key];
               } catch (ex) {
                  /** deprecated methods */
               }
            }
         }
      );

      return Target;
   }
}
