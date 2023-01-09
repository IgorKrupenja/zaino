import './NewLabel.scss';

import { Label } from '@zaino/shared';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

import { addLabel } from '../../../state/slices/labelsSlice';
import { getRandomColor } from '../../../utils';
import { Button } from '../../common/controls/Button';
import { LabelBadge } from '../../common/misc/LabelBadge';
import { LabelForm } from '../LabelForm';

type NewLabelProps = {
  toggleForm: () => void;
};

export const NewLabel = ({ toggleForm }: NewLabelProps) => {
  const dispatch = useDispatch();

  const [colorName, setColorName] = useState(getRandomColor().name);
  const label: Label = {
    colorName,
    id: uuid(),
    itemTotalCount: 0,
    itemUniqueCount: 0,
    lastSortIndex: 0,
    name: '',
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
        // lastSortIndex to keep newly-created label at the top of the list if sorting by name
        onSubmit={(label) => dispatch(addLabel({ ...label, lastSortIndex: 0 }))}
        setColorName={setColorName}
        setName={setName}
        toggleForm={toggleForm}
      >
        <Button className="new-label__create" submit>
          Create new label
        </Button>
      </LabelForm>
    </div>
  );
};
