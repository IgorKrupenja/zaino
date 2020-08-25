import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { OptionTypeBase, ValueType } from 'react-select';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import { v4 as uuid } from 'uuid';
import { addLabel } from '../../state/slices/labels';
import { RootState } from '../../state/store';
import { Label } from '../../types/Label';
import getRandomLabelColor from '../../utils/getRandomLabelColor';

export type LabelSelectOption = {
  value: string;
  label: string;
} & OptionTypeBase;

type LabelSelectProps = {
  labelIds?: string[];
  onChange: (labelIds: string[]) => void;
  isClearable?: boolean;
  isCreatable?: boolean;
};

const LabelSelect = ({ labelIds, onChange, isClearable, isCreatable }: LabelSelectProps) => {
  const dispatch = useDispatch();
  // labels and getMappedLabels need to be separate to prevent exceeding max depth with ItemForm
  const labels = useSelector((state: RootState) => state.labels);
  const getMappedLabels = (labels: Label[]) =>
    labels
      .map(label => ({
        value: label.id,
        label: label.name,
      }))
      .sort((a, b) => (a.label > b.label ? 1 : -1));
  const [options, setOptions] = useState(getMappedLabels(labels));
  // get selected label id's for the item and assign to values
  const [values, setValues] = useState<ValueType<LabelSelectOption>>(
    labelIds ? options.filter(label => labelIds.includes(label.value)) : []
  );

  // update options in DashboardFilters when new ones are created in ItemForm
  useEffect(() => setOptions(getMappedLabels(labels)), [labels]);

  const handleChange = (newValues: ValueType<LabelSelectOption>) => {
    setValues(newValues);
    const valueArray = newValues as LabelSelectOption[];
    // turn values into labelIds
    const labelIds: string[] = valueArray
      ? valueArray.map((label: LabelSelectOption) => label.value)
      : [];
    onChange(labelIds);
  };

  const handleCreate = (inputValue: string) => {
    const id = uuid();
    dispatch(addLabel({ id, name: inputValue, color: getRandomLabelColor(), itemCount: 0 }));

    const newOption = {
      label: inputValue,
      value: id,
    };
    setOptions([...options, newOption]);

    const valueArray = values as LabelSelectOption[];
    handleChange(valueArray ? [...valueArray, newOption] : [newOption]);
  };

  const selectProps = {
    isMulti: true,
    isClearable,
    // allows for animation on clearing a label
    components: makeAnimated<LabelSelectOption>(),
    // todo does this work well?
    hideSelectedOptions: false,
    onChange: handleChange,
    onCreateOption: handleCreate,
    options,
    value: values,
  };

  return (
    <label>
      Labels
      {isCreatable ? <CreatableSelect {...selectProps} /> : <Select {...selectProps} />}
    </label>
  );
};

export default LabelSelect;
