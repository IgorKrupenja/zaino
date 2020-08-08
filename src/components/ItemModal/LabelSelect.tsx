import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addLabel } from '../../slices/labels';
import { RootState } from '../../store/store';
import { Item, LabelOption } from '../../types/types';
import { ValueType } from 'react-select';

type LabelSelectProps = {
  selectedLabelIds: string[];
  itemValues: Item;
  setItemValues: (item: Item) => void;
};

const LabelSelect = ({ selectedLabelIds, itemValues, setItemValues }: LabelSelectProps) => {
  const dispatch = useDispatch();
  // allows for animation on clearing a label
  const animatedComponents = makeAnimated<LabelOption>();
  // get all labels from store and assign to options
  const [options, setOptions] = useState(
    useSelector((state: RootState) => state.labels).map(label => ({
      value: label.id,
      label: label.name,
    }))
  );
  // get selected label id's for the item and assign to values
  const [values, setValues] = useState<ValueType<LabelOption>>(
    selectedLabelIds ? options.filter(label => selectedLabelIds.includes(label.value)) : []
  );

  const handleChange = (newValues: ValueType<LabelOption>) => {
    setValues(newValues);
    const labels = newValues ? newValues.map((label: LabelOption) => label.value) : [];
    setItemValues({ ...itemValues, labels });
  };

  const handleCreate = (inputValue: string) => {
    //todo temporary color
    const id = uuid();
    dispatch(addLabel({ id, name: inputValue, color: '#DF7A03' }));
    const newOption = {
      label: inputValue,
      value: id,
    };
    setOptions([...options, newOption]);
    setValues([...(values as LabelOption[]), newOption]);
  };
  return (
    <>
      <h3>Labels</h3>
      <CreatableSelect
        isMulti
        isClearable={false}
        // todo is this ok?
        components={animatedComponents}
        // todo can I style this well?
        hideSelectedOptions={false}
        onChange={handleChange}
        onCreateOption={handleCreate}
        value={values}
        options={options}
      />
    </>
  );
};

export default LabelSelect;
