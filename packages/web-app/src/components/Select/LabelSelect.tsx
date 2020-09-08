import { Colors, getRandomColor, Label } from '@zaino/shared';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { ValueType } from 'react-select';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import { v4 as uuid } from 'uuid';
import { addLabel } from '../../state/slices/labels';
import { RootState } from '../../state/store';
import LabelSelectStyles from '../../styles/select/LabelSelect';

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
  // labels and prepareOptions need to be separate to prevent exceeding max depth with ItemForm
  const labels = useSelector((state: RootState) => state.labels);
  // todo also think on variable/fn names
  const prepareOptions = (labels: Label[]) =>
    labels
      .map(label => ({
        value: label.id,
        label: label.name,
        hexValue: Colors.find(color => color.name === label.colorName)?.hexValue,
      }))
      .sort((a, b) => (a.label > b.label ? 1 : -1));
  const [options, setOptions] = useState(prepareOptions(labels));
  // prepare select values based on passed selected labelIds
  // had to use useCallback to prevent prepareValues running on every re-render
  // as prepareValues is a dependency of an useEffect hook below
  const prepareValues = useCallback(
    (labelIds: string[] | undefined) => {
      return labelIds ? options.filter(label => labelIds.includes(label.value)) : [];
    },
    [options]
  );
  const [values, setValues] = useState<ValueType<LabelSelectOption>>(prepareValues(labelIds));

  // display filtered label when set by clicking on label/category inside ItemDetails
  useEffect(() => setValues(prepareValues(labelIds)), [prepareValues, labelIds]);
  // update options in DashboardFilters when new ones are created in ItemForm
  useEffect(() => setOptions(prepareOptions(labels)), [labels]);

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
    dispatch(
      addLabel({
        id,
        name: inputValue,
        colorName: color.name,
        itemUniqueCount: 0,
        itemTotalCount: 0,
      })
    );

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
