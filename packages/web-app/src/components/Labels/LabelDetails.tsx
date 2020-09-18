import { Label } from '@zaino/shared/';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useToggle from '../../hooks/useToggle';
import { setItemLabelsFilter } from '../../state/slices/itemsFilters';
import { deleteLabel, updateLabel } from '../../state/slices/labels';
import { Button } from '../misc/Button';
import { CloseButton } from '../misc/CloseButton';
import { Popover } from '../Popover/Popover';
import { PopoverContent } from '../Popover/PopoverContent';
import { PopoverHeader } from '../Popover/PopoverHeader';
import LabelForm from './LabelForm';

const LabelDetails = (label: Label) => {
  const dispatch = useDispatch();
  const [isFormOpen, toggleForm] = useToggle();
  const [name, setName] = useState(label.name);
  const [isPopoverOpen, togglePopover] = useToggle();

  // extracted from render for clarity
  let nameElement: React.ReactNode;
  if (isFormOpen) {
    // show label name (or 'Label preview') if form is open
    nameElement = name.length > 0 ? name : 'Label preview';
  } else {
    // show link to dashboard if label form is not open for edits
    nameElement = (
      // set label filter on Dashboard
      <Link to="/dashboard" onClick={() => dispatch(setItemLabelsFilter([label.id]))}>
        {name}
      </Link>
    );
  }

  const itemTotalCount = label.itemTotalCount;
  return (
    <article key={label.id}>
      {nameElement}
      {itemTotalCount ? (
        <span>
          {itemTotalCount} item{itemTotalCount > 1 && 's'} ({label.itemUniqueCount} unique)
        </span>
      ) : null}
      {!isFormOpen && <button onClick={toggleForm}>Edit</button>}
      <Popover
        isOpen={isPopoverOpen}
        onClickOutside={togglePopover}
        containerClassName="popover-container--wide"
        content={
          <>
            <PopoverHeader text="Delete item?">
              <CloseButton className="close-button--large-padding" onClick={togglePopover} />
            </PopoverHeader>
            <PopoverContent>
              <p>Deleting a label will remove it from all items. There is no undo.</p>
            </PopoverContent>
            <Button
              className="button--red button--wide"
              onClick={() => dispatch(deleteLabel(label.id))}
            >
              Delete
            </Button>
          </>
        }
      >
        <button onClick={togglePopover}>Delete</button>
      </Popover>
      {isFormOpen && (
        <LabelForm
          label={label}
          onSubmit={label => dispatch(updateLabel(label))}
          toggleForm={toggleForm}
          setLabelDetailsName={setName}
        />
      )}
    </article>
  );
};

export default LabelDetails;
