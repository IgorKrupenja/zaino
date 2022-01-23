import React, { ReactNode, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColorName } from '../../../constants/Colors';
import { selectAllLabels } from '../../../state/selectors/labels';
import { sortLabelsBy } from '../../../state/slices/labelsFilters';
import { CollectionSortOption } from '../../../state/collectionSettings';
import { RootState } from '../../../state/store';
import { getClassString } from '../../../utils/getClassString';
import { Button } from '../../Common/Controls/Button';
import { FormError } from '../../Common/Controls/FormError';
import { FormLabel } from '../../Common/Controls/FormLabel';
import { Input } from '../../Common/Controls/Input';
import { ColorSelect } from '../../Common/Selects/ColorSelect';
import { Row } from '../../Common/Wrappers/Row';
import './style.scss';
import { Label } from '../../../shared';

type LabelFormProps = {
  label: Label;
  onSubmit: (label: Label) => void;
  toggleForm: () => void;
  setLabelBadgeText: (labelName: string) => void;
  setLabelBadgeColor: (colorName: ColorName) => void;
  children: ReactNode;
  className?: string;
};

export const LabelForm = ({
  label,
  onSubmit,
  toggleForm,
  setLabelBadgeText,
  setLabelBadgeColor,
  children,
  className,
}: LabelFormProps) => {
  const dispatch = useDispatch();
  const labels = useSelector((state: RootState) => selectAllLabels(state));
  const labelSortOption = useSelector((state: RootState) => state.labelsFilters.sortBy);
  const [values, setValues] = useState(label);
  const [nameError, setNameError] = useState('');
  const initialName = useRef(values.name).current;
  const initialColor = useRef(values.colorName).current;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.name.trim()) {
      setNameError('Name cannot be blank');
    } else if (
      labels.map((label) => label.name).includes(values.name) &&
      // allow saving label if name unchanged
      initialName !== values.name
    ) {
      setNameError('Label with this name already exists');
    } else {
      // allows for in-place rename if sort is set to name
      labelSortOption === CollectionSortOption.name &&
        dispatch(sortLabelsBy(CollectionSortOption.lastSortOrder));
      onSubmit({ ...values });
      toggleForm();
    }
  };

  return (
    <form className={getClassString('label-form', className)} onSubmit={handleSubmit}>
      <FormLabel className="label-form__input__label" htmlFor={label.name || 'new-name'}>
        Name
      </FormLabel>
      <Row>
        <Input
          // use actual label.name instead of "name" so that name and id are unique
          // this is needed to focus the correct input on FormLabel click
          // if forms for several labels are open at the same time
          // "new-name" is used for new labels
          name={label.name || 'new-name'}
          className="label-form__input"
          value={values.name}
          error={nameError}
          autoFocus
          onChange={(e) => {
            e.persist();
            const name = e.target.value;
            setValues({ ...values, name });
            // update label name preview on typing if editing a label
            setLabelBadgeText && setLabelBadgeText(name);
          }}
          clearError={() => setNameError('')}
        />
        <ColorSelect
          selectedColorName={values.colorName}
          onChange={(colorName) => {
            setLabelBadgeColor(colorName);
            setValues({ ...values, colorName });
          }}
        />
      </Row>
      {nameError && <FormError className="label-form__input__error">{nameError}</FormError>}
      <Row className="label-form__buttons">
        <Button
          className="button--grey label-form__cancel"
          onClick={() => {
            toggleForm();
            // reset label name preview on typing if cancelling edit
            setLabelBadgeText(initialName);
            // also reset label badge preview color
            setLabelBadgeColor(initialColor);
          }}
        >
          Cancel
        </Button>
        {/* other buttons passed as children */}
        {children}
      </Row>
    </form>
  );
};
