import DecoratorOption from './decorator.option';
import {
   PROVIDABLE   
} from '../factory/behaviours';

export default class TProvidables extends DecoratorOption {
   private kind = PROVIDABLE;

   constructor(key, targetName, dependencies) {
      super(key, targetName, dependencies);

      this.setValidation({
         if: !(dependencies instanceof Array),
         throws: `${key} option must to be an instance of array.`
      });
   }
}