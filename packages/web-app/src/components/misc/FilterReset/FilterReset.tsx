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

function isFilteringItems(filters: ItemFilters | LabelFilters): filters is ItemFilters {
  return (filters as ItemFilters).labels !== undefined;
}

export const FilterReset = ({ filters, initialFilters, children }: FilterResetProps) => {
  let isFiltering = false;

  isFiltering =
    !shallowEqual(filters, initialFilters) &&
    // if dealing with item filters (and not label filters),
    // also check that filters by label are set;
    // shallowEqual does not check for that correctly
    (isFilteringItems(filters) ? !(filters.labels.length === 0) : true);

  return isFiltering ? <div>{children}</div> : <></>;
};
