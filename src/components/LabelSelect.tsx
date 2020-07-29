import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addLabel } from '../slices/labels';
import { RootState } from '../store/store';

type LabelSelectProps = {
  selectedLabelIds: string[];
  setLabels: (labels: string[]) => void;
};

const LabelSelect = ({ selectedLabelIds, setLabels }: LabelSelectProps) => {
  const dispatch = useDispatch();
  // allows for animation on clearing a label
  const animatedComponents = makeAnimated();
  // get all labels from store and assign to options
  const [options, setOptions] = useState(
    useSelector((state: RootState) => state.labels).map(label => ({
      value: label.id,
      label: label.name,
    }))
  );
  // get selected label id's for the item and assign to values
  const [values, setValues] = useState(
    selectedLabelIds ? options.filter(label => selectedLabelIds.includes(label.value)) : []
  );

  // update ItemForm state on item labels change
  useEffect(() => {
    values ? setLabels(values.map(label => label.value)) : setLabels([]);
  }, [values, setLabels]);

  const handleCreate = (inputValue: string) => {
    //todo temporary color
    const id = uuid();
    dispatch(addLabel({ id, name: inputValue, color: '#DF7A03' }));
    const newOption = {
      label: inputValue,
      value: id,
    };
    setOptions([...options, newOption]);
    setValues([...values, newOption]);
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
        // recommendation to use 'any' here from react-select docs
        onChange={(newValues: any) => setValues(newValues)}
        onCreateOption={handleCreate}
        value={values}
        options={options}
      />
    </>
  );
};

export default LabelSelect;
