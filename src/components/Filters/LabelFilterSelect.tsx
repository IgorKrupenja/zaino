import React, { useState } from 'react';
import Select, { ValueType } from 'react-select';
import makeAnimated from 'react-select/animated';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setLabelsFilter } from '../../slices/filters';
import { LabelOption } from '../../types/types';

const LabelFilterSelect = () => {
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated<LabelOption>();
  // get all labels from store
  const options = useSelector((state: RootState) => state.labels).map(label => ({
    value: label.id,
    label: label.name,
  }));
  const [values, setValues] = useState<ValueType<LabelOption>>([]);

  const handleChange = (newValues: ValueType<LabelOption>) => {
    setValues(newValues);
    dispatch(setLabelsFilter(newValues ? newValues.map((label: LabelOption) => label.value) : []));
  };

  return (
    <Select
      isMulti
      // todo is this ok?
      components={animatedComponents}
      // todo can I style this well?
      hideSelectedOptions={false}
      onChange={handleChange}
      value={values}
      options={options}
    />
  );
};

export default LabelFilterSelect;
