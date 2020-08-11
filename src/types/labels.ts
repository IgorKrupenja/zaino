import { OptionTypeBase } from 'react-select';

export type Label = {
  id: string;
  name: string;
  color: string;
  itemCount: number;
};

// used in components based on react-select
export type LabelOption = {
  value: string;
  label: string;
} & OptionTypeBase;

export enum LabelSortOption {
  name = 'Name',
  itemCount = 'Number of items',
}
