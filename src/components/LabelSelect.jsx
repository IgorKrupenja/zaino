import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { useSelector, useDispatch } from 'react-redux';
import { addLabel } from '../slices/labels';

const LabelSelect = props => {
  const dispatch = useDispatch();
  // get all labels from store and assign to options
  const [options, setOptions] = useState(
    useSelector(state => state.labels).map(label => ({ value: label.id, label: label.name }))
  );
  // get selected labels for the item and assign to values
  const [values, setValues] = useState(
    props.selectedLabelIds
      ? options.filter(label => props.selectedLabelIds.includes(label.value))
      : []
  );
  const [isLoading, setIsLoading] = useState(false);

  // update ItemForm state on item labels change
  useEffect(() => {
    values ? props.setLabels(values.map(label => label.value)) : props.setLabels([]);
  }, [values]);

  const handleCreate = async inputValue => {
    // todo loading not styled well - should be greyed out perhaps?
    setIsLoading(true);
    //todo temporary color
    const addAction = await dispatch(addLabel({ name: inputValue, color: '#DF7A03' }));
    setIsLoading(false);
    const newOption = {
      label: inputValue,
      value: addAction.payload.id,
    };
    setOptions([...options, newOption]);
    setValues([...values, newOption]);
  };
  return (
    <>
      <h3>Labels</h3>
      {props.labels}
      <CreatableSelect
        isMulti
        isClearable={false}
        isLoading={isLoading}
        onChange={newValues => setValues(newValues)}
        onCreateOption={handleCreate}
        value={values}
        options={options}
      />
    </>
  );
};

export default LabelSelect;
