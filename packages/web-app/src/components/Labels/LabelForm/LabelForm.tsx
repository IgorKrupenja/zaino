import { Label } from '@zaino/shared';
import React, { ReactNode, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { ColorName, getRandomColor } from '../../../constants/Colors';
import useToggle from '../../../hooks/useToggle';
import { selectAllLabels } from '../../../state/selectors/labels';
import { deleteLabel } from '../../../state/slices/labels';
import { LabelSortOption, sortLabelsBy } from '../../../state/slices/labelsFilters';
import { RootState } from '../../../state/store';
import { Button } from '../../Controls/Button';
import { CloseButton } from '../../Controls/CloseButton';
import { FormLabel } from '../../Controls/FormLabel';
import { Input } from '../../Controls/Input';
import { Popover } from '../../Misc/Popover';
import { ColorSelect } from '../../Selects/ColorSelect';
import './style.scss';

type LabelFormProps = {
  label?: Label;
  onSubmit: (label: Label) => void;
  toggleForm: () => void;
  setLabelDetailsName?: (labelName: string) => void;
  children: ReactNode;
};

export const LabelForm = ({
  label,
  onSubmit,
  toggleForm,
  setLabelDetailsName,
  children,
}: LabelFormProps) => {
  const dispatch = useDispatch();
  const labels = useSelector((state: RootState) => selectAllLabels(state));
  const labelSortOption = useSelector((state: RootState) => state.labelsFilters.sortBy);
  const newLabel: Label = {
    id: uuid(),
    name: '',
    colorName: getRandomColor().name,
    itemUniqueCount: 0,
    itemTotalCount: 0,
  };
  const [values, setValues] = useState(label ?? newLabel);
  const [nameError, setNameError] = useState('');
  // todo need to handle this nice
  const initialName = useRef(values.name).current;
  const [isPopoverOpen, togglePopover] = useToggle();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.name) {
      setNameError('Please enter a name');
    } else if (
      labels.map(label => label.name).includes(values.name) &&
      // todo this is tricky, maybe pass down initial name?
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
    <>
      {/* show label name preview if adding a new label */}
      {!label && <span>{values.name ? values.name : 'Label preview'}</span>}
      <form className="label-form" onSubmit={handleSubmit}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          value={values.name}
          error={nameError}
          autoFocus
          onChange={e => {
            e.persist();
            const name = e.target.value;
            setValues({ ...values, name });
            // update label name preview on typing if editing a label
            setLabelDetailsName && setLabelDetailsName(name);
          }}
        />
        {/* todo use edit icon and create a component out of it? */}
        <ColorSelect
          selectedColorName={values.colorName as ColorName}
          onChange={colorName => {
            setValues({ ...values, colorName });
          }}
        />
        {/* todo this should not show for new label */}
        {/* todo also how to place delete button? UI over two rows? */}
        <Popover
          isOpen={isPopoverOpen}
          onClickOutside={togglePopover}
          containerClassName="popover--wide"
          content={
            <>
              <Popover.Header>
                <Popover.Title>Delete label?</Popover.Title>
                <CloseButton className="close-button--large-padding" onClick={togglePopover} />
              </Popover.Header>
              <Popover.Content>
                Deleting a label will remove it from all items. There is no undo.
              </Popover.Content>
              <Button
                className="button--red button--wide"
                onClick={() => label && dispatch(deleteLabel(label.id))}
              >
                Delete
              </Button>
            </>
          }
        >
          <Button className="button--red" onClick={togglePopover}>
            Delete
          </Button>
        </Popover>
        <Button
          className="button--grey"
          onClick={() => {
            toggleForm();
            // reset label name preview on typing if cancelling edit
            // todo also here
            setLabelDetailsName && setLabelDetailsName(initialName);
          }}
        >
          Cancel
        </Button>
        {children}
      </form>
    </>
  );
};
