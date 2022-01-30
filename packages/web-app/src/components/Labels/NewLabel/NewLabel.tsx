import { Label } from '@zaino/shared';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addLabel } from '../../../state/slices/labels';
import { getRandomColor } from '../../../utils';
import { Button } from '../../Common/Controls/Button';
import { LabelBadge } from '../../Common/LabelBadge/LabelBadge';
import { LabelForm } from '../LabelForm';
import './style.scss';

type NewLabelProps = {
  toggleForm: () => void;
};

export const NewLabel = ({ toggleForm }: NewLabelProps) => {
  const dispatch = useDispatch();
  const [colorName, setColorName] = useState(getRandomColor().name);
  const label: Label = {
    id: uuid(),
    name: '',
    colorName: colorName,
    itemUniqueCount: 0,
    itemTotalCount: 0,
    lastSortIndex: 0,
  };
  const [name, setName] = useState(label.name);

  return (
    <div className="new-label__container">
      <LabelBadge className="new-label__badge" colorName={colorName} disabled>
        {name.trim() ? name : 'new label'}
      </LabelBadge>
      <LabelForm
        className="new-label"
        label={label}
        // lastSortIndex to keep newly-created label at the top of the list -- if sorting by name
        onSubmit={(label) => dispatch(addLabel({ ...label, lastSortIndex: 0 }))}
        toggleForm={toggleForm}
        setLabelBadgeText={setName}
        setLabelBadgeColor={setColorName}
      >
        <Button submit className="button--green new-label__create">
          Create new label
        </Button>
      </LabelForm>
    </div>
  );
};
