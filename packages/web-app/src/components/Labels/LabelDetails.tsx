import { Label } from '@zaino/shared/';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useToggle from '../../hooks/useToggle';
import { setItemsLabelsFilter } from '../../state/slices/itemsFilters';
import { deleteLabel, updateLabel } from '../../state/slices/labels';
import PopoverContainer from '../common/PopoverContainer';
import LabelForm from './LabelForm';

const LabelDetails = (label: Label) => {
  const dispatch = useDispatch();
  const [isFormOpen, toggleForm] = useToggle();
  const [name, setName] = useState(label.name);

  // extracted from render for clarity
  let nameElement: React.ReactNode;
  if (isFormOpen) {
    // show label name (or 'Label preview') if form is open
    nameElement = name.length > 0 ? name : 'Label preview';
  } else {
    // show link to dashboard if label form is not open for edits
    nameElement = (
      // set label filter on Dashboard
      <Link to="/dashboard" onClick={() => dispatch(setItemsLabelsFilter([label.id]))}>
        {name}
      </Link>
    );
  }

  const itemCount = label.itemCount;
  return (
    <article key={label.id}>
      {nameElement}
      {itemCount > 0 && (
        <span>
          {itemCount} item{itemCount > 1 && 's'}
        </span>
      )}
      {!isFormOpen && <button onClick={toggleForm}>Edit</button>}
      <PopoverContainer
        heading="Delete label?"
        text="Deleting a label will remove it from all items. There is no undo."
        buttonAction={() => dispatch(deleteLabel(label.id))}
      />
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
