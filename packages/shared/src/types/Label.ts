import { ColorName } from '@zaino/web-app/src/constants/Colors';

export type Label = {
  id: string;
  name: string;
  colorName: ColorName;
  itemUniqueCount?: number;
  itemTotalCount?: number;
  lastSortIndex?: number;
  isFromDemoData?: boolean;
};
