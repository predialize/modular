export default class TBindables {
   private kind = 'BINDALBLE';

   set(evaluation, Target) {
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