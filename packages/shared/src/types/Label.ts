import { Collection } from './Collection';
import { ColorName } from './ColorName';

export type Label = Collection & {
  colorName: ColorName;
  isFromDemoData?: boolean;
};
