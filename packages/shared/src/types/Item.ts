export type Item = {
  id: string;
  name: string;
  categoryName: string;
  quantity: number;
  packQuantity: number;
  // allow empty string for weight
  weight: number | '';
  // as Date is not serializable and should not be stored in Redux store state,
  // opting to use ISO format UTC string - they are also directly comparable when sorting
  addedAt: string;
  labelIds?: string[];
  notes?: string;
};
