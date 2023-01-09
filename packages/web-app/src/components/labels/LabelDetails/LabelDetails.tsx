import './LabelDetails.scss';

import { Label } from '@zaino/shared';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useToggle } from '../../../hooks';
import { resetItemFilters } from '../../../state/slices/itemFiltersSlice';
import { deleteLabel, updateLabel } from '../../../state/slices/labelsSlice';
import { Row } from '../../common/containers/Row';
import { Button } from '../../common/controls/Button';
import { CloseButton } from '../../common/controls/CloseButton';
import { LabelBadge } from '../../common/misc/LabelBadge';
import { Popover } from '../../common/misc/Popover';
import { LabelForm } from '../LabelForm';

export const LabelDetails = (label: Label) => {
  const dispatch = useDispatch();
  const [isFormOpen, toggleForm] = useToggle();
  const [name, setName] = useState(label.name);
  const [colorName, setColorName] = useState(label.colorName);
  const itemTotalCount = label.itemTotalCount;
  const [isPopoverOpen, togglePopover] = useToggle();
  const navigate = useNavigate();

  return (
    <article className="label-details" key={label.id}>
      <Row className="label-details__main">
        <div className="label-details__badge__container">
          <LabelBadge
            className="label-details__badge"
            colorName={colorName}
            disabled={isFormOpen}
            label={label}
            onClick={() => {
              dispatch(resetItemFilters());
              navigate('/dashboard');
            }}
          >
            {isFormOpen ? (name.trim() ? name : 'Label preview') : undefined}
          </LabelBadge>
        </div>
        {/* Item count */}
        {itemTotalCount ? (
          <div
            className={`label-details__count${
              isFormOpen ? ' label-details__count--form-open' : ''
            }`}
          >
            {itemTotalCount} item{itemTotalCount > 1 && 's'} ({label.itemUniqueCount} unique)
          </div>
        ) : null}
        {!isFormOpen && (
          <Button className="label-details__edit" onClick={toggleForm} variant="transparent">
            Edit
          </Button>
        )}
      </Row>
      {isFormOpen && (
        <LabelForm
          label={label}
          onSubmit={(label) => dispatch(updateLabel(label))}
          setColorName={setColorName}
          setName={setName}
          toggleForm={toggleForm}
        >
          {/* Delete button with popover */}
          <Popover
            content={
              <>
                <Popover.Header>
                  <Popover.Title>Delete label?</Popover.Title>
                  <CloseButton onClick={togglePopover} />
                </Popover.Header>
                <Popover.Content>
                  <Popover.Text>
                    Deleting a label will remove it from all items. There is no undo.
                  </Popover.Text>
                  <Button
                    onClick={() => label && dispatch(deleteLabel(label.id))}
                    variant="secondary"
                  >
                    Delete
                  </Button>
                </Popover.Content>
              </>
            }
            isOpen={isPopoverOpen}
            onClickOutside={togglePopover}
            size="large"
          >
            <Button className="label-details__delete" onClick={togglePopover} variant="secondary">
              Delete
            </Button>
          </Popover>
          {/* Save changes button */}
          <Button className="label-details__save" submit>
            Save changes
          </Button>
        </LabelForm>
      )}
    </article>
  );
};
