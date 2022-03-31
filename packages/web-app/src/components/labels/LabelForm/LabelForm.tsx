import { ColorName, Label } from '@zaino/shared';
import { ReactNode, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CollectionSortOption } from '../../../state/enums';
import { selectAllLabels } from '../../../state/selectors/labelsSelector';
import { sortLabelsBy } from '../../../state/slices/labelFiltersSlice';
import { RootState } from '../../../state/store';
import { getClassString } from '../../../utils';
import { Row } from '../../common/containers/Row';
import { Button } from '../../common/controls/Button';
import { FormError } from '../../common/controls/FormError';
import { FormLabel } from '../../common/controls/FormLabel';
import { Input } from '../../common/controls/Input';
import { ColorSelect } from '../../common/selects/ColorSelect';
import './LabelForm.scss';

type LabelFormProps = {
  label: Label;
  onSubmit: (label: Label) => void;
  toggleForm: () => void;
  setName: (labelName: string) => void;
  setColorName: (colorName: ColorName) => void;
  children: ReactNode;
  className?: string;
};

export const LabelForm = ({
  label,
  onSubmit,
  toggleForm,
  setName,
  setColorName,
  children,
  className,
}: LabelFormProps) => {
  const dispatch = useDispatch();
  const labels = useSelector((state: RootState) => selectAllLabels(state));
  const labelSortOption = useSelector((state: RootState) => state.labelFilters.sortBy);
  const [values, setValues] = useState(label);
  const [nameError, setNameError] = useState('');
  const initialName = useRef(values.name).current;
  const initialColorName = useRef(values.colorName).current;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values.name.trim()) {
      setNameError('Name cannot be blank');
    } else if (
      labels
        // Allow saving label if name unchanged
        .filter((label) => label.name !== initialName)
        .map((label) => label.name)
        .includes(values.name)
    ) {
      setNameError('Label with this name already exists');
    } else {
      // Allows for in-place rename if sort is set to name
      labelSortOption === CollectionSortOption.name &&
        dispatch(sortLabelsBy(CollectionSortOption.lastSortOrder));
      onSubmit({ ...values });
      toggleForm();
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.persist();

    const name = e.target.value;
    setValues({ ...values, name });
    setName && setName(name);
  };

  return (
    <form
      className={getClassString('label-form', { extraClassNames: className })}
      onSubmit={handleSubmit}
    >
      <FormLabel className="label-form__input__label" htmlFor={label.name || 'new-name'}>
        Name
      </FormLabel>
      <Row>
        <Input
          name={label.name || 'new-name'}
          className="label-form__input"
          value={values.name}
          error={nameError}
          autoFocus
          onChange={(e) => handleNameChange(e)}
          clearError={() => setNameError('')}
        />
        <ColorSelect
          selectedColorName={values.colorName}
          onChange={(colorName) => {
            setColorName(colorName);
            setValues({ ...values, colorName });
          }}
        />
      </Row>
      {nameError && <FormError className="label-form__input__error">{nameError}</FormError>}
      <Row className="label-form__buttons">
        <Button
          className="label-form__cancel"
          variant="tertiary"
          onClick={() => {
            toggleForm();
            setName(initialName);
            setColorName(initialColorName);
          }}
        >
          Cancel
        </Button>
        {children}
      </Row>
    </form>
  );
};
