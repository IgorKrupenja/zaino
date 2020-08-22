import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LabelSortOption,
  setLabelsTextFilter,
  sortLabelsBy,
} from '../../state/slices/labelsFilters';
import { RootState } from '../../state/store';
import FilterTextInput from '../common/FilterTextInput';
import SortBySelect from '../common/SortBySelect';

const LabelFilters = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(useSelector((state: RootState) => state.labelsFilters));

  return (
    <section className="label-filters">
      <FilterTextInput
        onTextChange={text => {
          setFilters({ ...filters, text });
          dispatch(setLabelsTextFilter(text));
        }}
        text={filters.text}
      />
      <SortBySelect
        options={LabelSortOption}
        onSortChange={value => {
          const sortBy = value as LabelSortOption;
          setFilters({ ...filters, sortBy });
          dispatch(sortLabelsBy(sortBy));
        }}
        sortBy={filters.sortBy}
      />
    </section>
  );
};

export default LabelFilters;
