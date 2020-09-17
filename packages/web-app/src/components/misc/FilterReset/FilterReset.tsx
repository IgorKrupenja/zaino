import React, { ReactNode } from 'react';
import { shallowEqual } from 'react-redux';
import { ItemFilters } from '../../../state/slices/itemsFilters';
import { LabelFilters } from '../../../state/slices/labelsFilters';
import './style.scss';

type FilterResetProps = {
  filters: ItemFilters | LabelFilters;
  initialFilters: ItemFilters | LabelFilters;
  children: ReactNode;
};

export const FilterReset = ({ filters, initialFilters, children }: FilterResetProps) => {
  const isFiltering = !shallowEqual(filters, initialFilters);

  return isFiltering ? <div>{children}</div> : <></>;
};
