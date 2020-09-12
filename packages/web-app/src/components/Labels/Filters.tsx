import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LabelSortOption,
  setLabelsTextFilter,
  sortLabelsBy,
} from '../../state/slices/labelsFilters';
import { RootState } from '../../state/store';
import { Input } from '../Input';
import { SortSelect } from '../Selects/SortSelect/';

const LabelFilters = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(useSelector((state: RootState) => state.labelsFilters));

  const handleSortChange = (value: string) => {
    const sortBy = value as LabelSortOption;
    setFilters({ ...filters, sortBy });
    // setTimeout to prevent UI freezing on slow PCs
    setTimeout(() => dispatch(sortLabelsBy(sortBy)), 1);
  };

  useEffect(() => {
    // setTimeout prevents UI freezes when typing
    const textFilterTimeout = setTimeout(() => dispatch(setLabelsTextFilter(filters.text)), 200);
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
    </section>
  );
};

export default LabelFilters;
