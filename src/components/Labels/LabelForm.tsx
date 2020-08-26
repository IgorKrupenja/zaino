import React, { ChangeEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { v4 as uuid } from 'uuid';
import { LabelColorOption, labelColorOptions } from '../../constants/labelColorOptions';
import { selectAllLabels } from '../../state/selectors/labels';
import { LabelSortOption, sortLabelsBy } from '../../state/slices/labelsFilters';
import { RootState } from '../../state/store';
import colorSelectStyles from '../../styles/labels/colorSelect';
import { Label } from '../../types/Label';
import getRandomColor from '../../utils/getRandomLabelColor';
import FormTextInput from '../common/FormTextInput';

type LabelFormProps = {
  label?: Label;
  onSubmit: (label: Label) => void;
  toggleForm: () => void;
  setLabelDetailsName?: (labelName: string) => void;
};

const LabelForm = ({ label, onSubmit, toggleForm, setLabelDetailsName }: LabelFormProps) => {
  const dispatch = useDispatch();
  const labels = useSelector((state: RootState) => selectAllLabels(state));
  const labelSortOption = useSelector((state: RootState) => state.labelsFilters.sortBy);
  const newLabel: Label = {
    id: uuid(),
    name: '',
    colorName: getRandomColor().value,
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
      // allows for in-place rename if sort options is set to name
      labelSortOption === LabelSortOption.name &&
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
            setLabelDetailsName && setLabelDetailsName(name);
          }}
        />
        {/* todo maybe separate ColorSelect component? */}
        <Select
          defaultValue={labelColorOptions.find(color => color.value === values.colorName)}
          isSearchable={false}
          options={labelColorOptions}
          styles={colorSelectStyles}
          onChange={colorOption => {
            setValues({ ...values, colorName: (colorOption as LabelColorOption).value });
          }}
        />
        <button
          type="button"
          onClick={() => {
            toggleForm();
            // reset label name preview on typing if cancelling edit
            setLabelDetailsName && setLabelDetailsName(initialName.current);
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
