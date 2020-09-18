import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  labelFiltersInitialState,
  LabelSortOption,
  resetLabelFilters,
  setLabelTextFilter,
  sortLabelsBy,
} from '../../../state/slices/labelsFilters';
import { RootState } from '../../../state/store';
import { Input } from '../../Input';
import { CloseButton } from '../../misc/CloseButton';
import { FilterReset } from '../../misc/FilterReset';
import { SortSelect } from '../../Selects/SortSelect';
import './style.scss';

export const LabelFilters = () => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state: RootState) => state.labelsFilters);
  const [filters, setFilters] = useState(selectedFilters);

  // set filters if changed externally in FilterReset
  useEffect(() => setFilters(selectedFilters), [selectedFilters]);

  const handleSortChange = (value: string) => {
    const sortBy = value as LabelSortOption;
    setFilters({ ...filters, sortBy });
    // setTimeout to prevent UI freezing on slow PCs
    setTimeout(() => dispatch(sortLabelsBy(sortBy)), 1);
  };

  useEffect(() => {
    // setTimeout prevents UI freezes when typing
    const textFilterTimeout = setTimeout(() => dispatch(setLabelTextFilter(filters.text)), 200);
    return () => clearTimeout(textFilterTimeout);
  }, [filters.text, dispatch]);

  return (
    <section className="label-filters">
      <Input
        onChange={e => {
          e.persist();
          setFilters({ ...filters, text: e.target.value });
        }}
        value={filters.text}
      />
      <SortSelect
        sortOptions={LabelSortOption}
        selectedOption={filters.sortBy}
        hiddenOption={LabelSortOption.lastSortOrder}
        onChange={handleSortChange}
      />
      <FilterReset filters={filters} initialFilters={labelFiltersInitialState}>
        <CloseButton onClick={() => dispatch(resetLabelFilters())} />
        Clear search and sort
      </FilterReset>
    </section>
  );
};