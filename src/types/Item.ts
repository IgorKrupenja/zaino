import { CategoryName } from '../constants/categories';

export type Item = {
  id: string;
  name: string;
  // todo perhaps name categoryName
  categoryName: CategoryName;
  quantity: number;
  packQuantity: number;
  weight: number;
  // as Date is not serializable and should not be stored in Redux store state,
  // opting to use ISO format UTC string - they are also directly comparable when sorting
  addedAt: string;
  labelIds?: string[];
  notes?: string;
};
