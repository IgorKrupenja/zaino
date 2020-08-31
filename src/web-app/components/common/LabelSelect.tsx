import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { ValueType } from 'react-select';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import { v4 as uuid } from 'uuid';
import Label from '../../../common/types/Label';
import Colors, { getRandomColor } from '../../constants/Colors';
import { addLabel } from '../../state/slices/labels';
import { RootState } from '../../state/store';
import LabelSelectStyles from '../../styles/labels/LabelSelect';

export type LabelSelectOption = {
  value: string;
  label: string;
};

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
        hexValue: Colors.find(color => color.name === label.colorName)?.hexValue,
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
    const labelIds: string[] = valueArray ? valueArray.map(label => label.value) : [];
    onChange(labelIds);
  };

  const handleCreate = (inputValue: string) => {
    const id = uuid();
    const color = getRandomColor();
    dispatch(addLabel({ id, name: inputValue, colorName: color.name, itemCount: 0 }));

    const newOption = {
      label: inputValue,
      value: id,
      hexValue: color.hexValue,
    };
    setOptions([...options, newOption]);

    const valueArray = values as LabelSelectOption[];
    handleChange(valueArray ? [...valueArray, newOption] : [newOption]);
  };

  const selectProps = {
    className: 'label-select',
    isMulti: true,
    isClearable,
    // allows for animation on clearing a label
    components: makeAnimated<LabelSelectOption>(),
    // todo does this work well?
    hideSelectedOptions: false,
    onChange: handleChange,
    onCreateOption: handleCreate,
    styles: LabelSelectStyles,
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
