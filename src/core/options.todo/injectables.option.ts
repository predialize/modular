import DecoratorOption from './decorator.option';
import {
   INJECTABLE,
   RESOLVABLE
} from '../factory/behaviours';

export default class TInjectables extends DecoratorOption {
   private kind = INJECTABLE;
   static dependsOn = RESOLVABLE;

   constructor(key, targetName, dependencies) {
      super(key, targetName, dependencies);

      this.setValidation({
         if: !(dependencies instanceof Array),
         throws: `${key} option must to be an instance of array.`
      });
   }
}