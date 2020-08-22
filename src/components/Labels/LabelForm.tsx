import React, { ChangeEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { v4 as uuid } from 'uuid';
import { LabelColorOption, labelColorOptions } from '../../constants/labelColorOptions';
import { selectAllLabels } from '../../state/selectors/labels';
import { LabelSortOption, sortLabelsBy } from '../../state/slices/labelsFilters';
import { RootState } from '../../state/store';
import { labelColorStyles } from '../../styles/labels/labelColor';
import { Label } from '../../types/Label';
import getRandomColor from '../../utils/getRandomLabelColor';
import FormTextInput from '../common/FormTextInput';

type LabelFormProps = {
  label?: Label;
  onSubmit: (label: Label) => void;
  toggleForm: () => void;
  setLabelEntryName?: (labelName: string) => void;
};

const LabelForm = ({ label, onSubmit, toggleForm, setLabelEntryName }: LabelFormProps) => {
  const dispatch = useDispatch();
  const labels = useSelector((state: RootState) => selectAllLabels(state));
  const newLabel: Label = {
    id: uuid(),
    name: '',
    color: getRandomColor(),
    itemCount: 0,
  };
  const [values, setValues] = useState(label ?? newLabel);
  const [nameError, setNameError] = useState('');
  const initialName = useRef(values.name);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.name) {
      setNameError('Please enter a name');
    } else if (labels.map(label => label.name).includes(values.name)) {
      setNameError('Label with this name already exists');
    } else {
      dispatch(sortLabelsBy(LabelSortOption.lastSortOrder));
      onSubmit({ ...values });
      toggleForm();
    }
  };

  return (
    <>
      {/* show label name preview if adding a new label */}
      {!label && <span>{values.name ? values.name : 'Label preview'}</span>}
      <form onSubmit={handleSubmit}>
        <FormTextInput
          name={values.name}
          errorText={nameError}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            e.persist();
            const name = e.target.value;
            setValues({ ...values, name });
            // update label name preview on typing if editing a label
            setLabelEntryName && setLabelEntryName(name);
          }}
        />
        <Select
          defaultValue={labelColorOptions.find(color => color.value === values.color)}
          isSearchable={false}
          options={labelColorOptions}
          styles={labelColorStyles}
          onChange={colorOption => {
            const temp = colorOption as LabelColorOption;
            setValues({ ...values, color: temp.value });
          }}
        />
        <button
          type="button"
          onClick={() => {
            toggleForm();
            // reset label name preview on typing if cancelling edit
            setLabelEntryName && setLabelEntryName(initialName.current);
          }}
        >
          Cancel
        </button>
        <button>Save label</button>
      </form>
    </>
  );
};

export default LabelForm;
