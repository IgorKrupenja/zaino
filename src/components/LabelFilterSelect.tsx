import React, { useState } from 'react';
import ReactSelect, { ValueType, OptionTypeBase } from 'react-select';
import makeAnimated from 'react-select/animated';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setLabelsFilter } from '../slices/filters';

const LabelFilterSelect = () => {
  interface LabelOption extends OptionTypeBase {
    value: string;
    label: string;
  }
  // get all labels from store
  const options: LabelOption[] = useSelector((state: RootState) => state.labels).map(label => ({
    value: label.id,
    label: label.name,
  }));
  const [values, setValues] = useState<ValueType<LabelOption>>([]);
  const dispatch = useDispatch();

  const handleChange = (newValues: ValueType<LabelOption>) => {
    dispatch(setLabelsFilter(newValues ? newValues.map((label: LabelOption) => label.value) : []));
    setValues(newValues);
  };
  const animatedComponents = makeAnimated<LabelOption>();

  return (
    <ReactSelect
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
