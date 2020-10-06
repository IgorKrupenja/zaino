import { Label } from '@zaino/shared';
import React, { ReactNode, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColorName } from '../../../constants/Colors';
import { selectAllLabels } from '../../../state/selectors/labels';
import { LabelSortOption, sortLabelsBy } from '../../../state/slices/labelsFilters';
import { RootState } from '../../../state/store';
import { getClassString } from '../../../utils/getClassString';
import { Button } from '../../Controls/Button';
import { FormLabel } from '../../Controls/FormLabel';
import { Input } from '../../Controls/Input';
import { ColorSelect } from '../../Selects/ColorSelect';
import { ColumnWrapper } from '../../Wrappers/ColumnWrapper';
import { RowWrapper } from '../../Wrappers/RowWrapper';
import './style.scss';

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
      labels.map(label => label.name).includes(values.name) &&
      // allow saving label if name unchanged
      initialName !== values.name
    ) {
      setNameError('Label with this name already exists');
    } else {
      // allows for in-place rename if sort is set to name
      labelSortOption === LabelSortOption.name &&
        dispatch(sortLabelsBy(LabelSortOption.lastSortOrder));
      onSubmit({ ...values });
      toggleForm();
    }
  };

  return (
    <form className={`label-form${getClassString(className)}`} onSubmit={handleSubmit}>
      <RowWrapper className="label-form__row">
        <ColumnWrapper className="label-form__input__container">
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            className="label-form__input"
            value={values.name}
            error={nameError}
            autoFocus
            onChange={e => {
              e.persist();
              const name = e.target.value;
              setValues({ ...values, name });
              // update label name preview on typing if editing a label
              setLabelBadgeText && setLabelBadgeText(name);
            }}
          />
        </ColumnWrapper>
        <ColorSelect
          selectedColorName={values.colorName}
          onChange={colorName => {
            setLabelBadgeColor(colorName);
            setValues({ ...values, colorName });
          }}
        />
      </RowWrapper>
      <RowWrapper className="label-form__row">
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
      </RowWrapper>
    </form>
  );
};
