export default class DecoratorOption {
   private checkValidation;

   constructor(private key, private targetName, private dependencies) {}

   setValidation(validation) {
      this.checkValidation = () => {
         if (validation.if) {
            console.error(
               `${this.targetName} error: ${validation.throws}.`
            );

            process.exit(0);
         }
      }
   }

   getDependencies(behaviour, broadcast) {
      if (
         !this.dependencies ||
         (this.dependencies && this.dependencies.length === 0)
      )
         return;

      return this.dependencies.map((DependencyResolver) => {
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
   }
}