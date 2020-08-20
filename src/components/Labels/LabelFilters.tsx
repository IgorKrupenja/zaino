import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLabelsTextFilter, sortLabelsBy } from '../../state/slices/labelsFilters';
import { RootState } from '../../state/store';
import { LabelSortOption } from '../../types/labels';
import SortBySelect from '../common/SortBySelect';
import TextFilterInput from '../common/TextFilterInput';

const LabelFilters = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(useSelector((state: RootState) => state.labelsFilters));

  return (
    <section className="label-filters">
      <TextFilterInput
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
