export type Item = {
  id: string;
  name: string;
  categoryId?: string;
  quantity: number;
  packQuantity: number;
  // Allow empty string for weight — this seems better than undefined
  // as it prevents "A component is changing an uncontrolled input of type text to be controlled"
  // errors in ItemForm.
  weight: number | '';
  // As Date is not serializable and should not be stored in Redux store state,
  // using ISO format UTC string - they are also directly comparable when sorting.
  addedAt: string;
  labelIds?: string[];
  notes?: string;
  isFromDemoData?: boolean;
};
