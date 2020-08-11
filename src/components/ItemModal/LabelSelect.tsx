import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addLabel } from '../../slices/labels';
import { RootState } from '../../store/store';
import { Item } from '../../types/items';
import { ValueType } from 'react-select';
import { LabelOption } from '../../types/labels';

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

  const updateItemLabels = (newValues: LabelOption[]) => {
    const labels: string[] = newValues ? newValues.map((label: LabelOption) => label.value) : [];
    setItemValues({ ...itemValues, labels });
  };

  const handleChange = (newValues: ValueType<LabelOption>) => {
    setValues(newValues);
    updateItemLabels(newValues as LabelOption[]);
  };

  const handleCreate = (inputValue: string) => {
    //todo temporary color
    const id = uuid();
    dispatch(addLabel({ id, name: inputValue, color: '#DF7A03', itemCount: 0 }));
    const newOption = {
      label: inputValue,
      value: id,
    };

    setOptions([...options, newOption]);
    try {
      // todo #110, sometimes values are null?
      const newValues = [...(values as LabelOption[]), newOption];
      setValues(newValues);
      // also update item labels
      updateItemLabels(newValues);
    } catch (e) {
      console.log('diagnostics for #110');
      console.log(`values: ${values}`);
      console.log(`values length: ${values?.length}`);
      console.log(`newOption: ${newOption}`);
      throw new Error(e);
    }
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
