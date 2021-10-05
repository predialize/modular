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
      if (options && this.config.options) {
         const keys = Object.keys(options);
         let error = false;

         for (let i = 0; i < keys.length; i++) {
            if (
               this.config.options &&
               !this.config.options.some((ak) => ak === keys[i])
            ) {
               console.error(
                  `${this.targetName} error: options ${keys[i]} is not valid for ${this.config.type}'s decorator type.`
               );
               error = true;
            }
         }

         if (error) process.exit(0);
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
               console.error(
                  `${this.targetName} error: ${DependencyResolver.targetName} ${DependencyResolver.type} has no ${behaviour} behaviour.`
               );
               
               process.exit(0);
            }

            return new DependencyResolver(broadcast);
         });
      } catch(ex) {
         console.error("\x1b[31m", `${this.targetName}: one of the dependencies could not be injected. Check the file path.`);

         process.exit(0);
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
