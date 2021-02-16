import { ColorName } from '@zaino/web-app/src/constants/Colors';
import { Collection } from './Collection';

export type Label = Collection & {
  colorName: ColorName;
  isFromDemoData?: boolean;
};
