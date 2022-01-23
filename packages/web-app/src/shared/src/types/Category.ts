import { Collection } from './Collection';

export type Category = Collection & {
  imageFileName: string;
  // default category for new item
  isDefault?: boolean;
};
