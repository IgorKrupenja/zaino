import { ColorName } from '../../../constants/Colors';
import { Collection } from './Collection';

export type Label = Collection & {
  colorName: ColorName;
  isFromDemoData?: boolean;
};