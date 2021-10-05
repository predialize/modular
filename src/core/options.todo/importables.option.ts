import DecoratorOption from './decorator.option';
import {
   IMPORTABLE,
   DECLARABLE
} from '../factory/behaviours';

export default class TImportables extends DecoratorOption {
   private kind = IMPORTABLE;
   static dependsOn = DECLARABLE;
}