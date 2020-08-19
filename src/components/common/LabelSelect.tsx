import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { ValueType } from 'react-select';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import { v4 as uuid } from 'uuid';
import { addLabel } from '../../slices/labels';
import { RootState } from '../../store/store';
import { Item } from '../../types/items';
import { LabelOption } from '../../types/labels';

type LabelSelectProps = {
  itemValues?: Item;
  onChange: (newValues: LabelOption[]) => void;
  isClearable?: boolean;
  isCreatable?: boolean;
};

const LabelSelect = ({ itemValues, onChange, isClearable, isCreatable }: LabelSelectProps) => {
  const dispatch = useDispatch();
  // get all labels from store and assign to options
  const [options, setOptions] = useState(
    useSelector((state: RootState) => state.labels).map(label => ({
      value: label.id,
      label: label.name,
    }))
  );
  // get selected label id's for the item and assign to values
  const [values, setValues] = useState<ValueType<LabelOption>>(
    itemValues?.labels ? options.filter(label => itemValues.labels?.includes(label.value)) : []
  );

  const handleChange = (newValues: ValueType<LabelOption>) => {
    setValues(newValues);
    onChange(newValues as LabelOption[]);
  };
  const handleCreate = (inputValue: string) => {
    const id = uuid();
    //todo temporary color
    dispatch(addLabel({ id, name: inputValue, color: '#DF7A03', itemCount: 0 }));

    const newOption = {
      label: inputValue,
      value: id,
    };
    setOptions([...options, newOption]);

    handleChange([...(values as LabelOption[]), newOption]);
  };

  const selectProps = {
    isMulti: true,
    isClearable,
    // allows for animation on clearing a label
    components: makeAnimated<LabelOption>(),
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
