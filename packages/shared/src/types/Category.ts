import { Collection } from './Collection';

export type Category = Collection & {
  imageFileName: string;
  isDefault?: boolean;
};
