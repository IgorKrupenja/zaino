export type Item = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  packQuantity: number;
  weight: number;
  labels?: string[];
  notes?: string;
};

export type Label = {
  id: string;
  name: string;
  color: string;
};

export enum Category {
  backpacks = 'Backpacks',
  tents = 'Tents',
}

// todo maybe another enum CategoryAll? https://github.com/microsoft/TypeScript/issues/17592

export type Filters = {
  text: string;
  category: Category | undefined;
  labels: string[];
};
