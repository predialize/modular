import DecoratorOption from './decorator.option';
import {
   RESOLVABLE
} from '../factory/behaviours';

export default class TResolvables extends DecoratorOption {
   private kind = RESOLVABLE;

   constructor(key, targetName, dependencies) {
      super(key, targetName, dependencies);

      this.setValidation({
         if: dependencies instanceof Array,
         throws: `${key} option must not to be an instance of array.`
      });
   }
}