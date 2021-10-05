import DecoratorOption from './decorator.option';
import {
   PROVIDABLE,
   DECLARABLE
} from '../factory/behaviours';

export default class TDeclarables extends DecoratorOption {
   private kind = DECLARABLE;
   static dependsOn = PROVIDABLE;

   constructor(key, targetName, dependencies) {
      super(key, targetName, dependencies);

      this.setValidation({
         if: !(dependencies instanceof Array),
         throws: `${key} option must to be an instance of array.`
      });
   }
}