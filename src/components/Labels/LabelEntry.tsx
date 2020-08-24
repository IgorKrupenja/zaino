import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useToggle from '../../hooks/useToggle';
import { setItemsLabelsFilter } from '../../state/slices/itemsFilters';
import { deleteLabel, updateLabel } from '../../state/slices/labels';
import { Label as LabelEntry } from '../../types/Label';
import LabelForm from './LabelForm';

const LabelEntry = (label: LabelEntry) => {
  const dispatch = useDispatch();
  const [isFormOpen, toggleForm] = useToggle();
  const [name, setName] = useState(label.name);
  const setItemsFilter = () => {
    dispatch(setItemsLabelsFilter([label.id]));
  };

  // extracted from render for clarity
  let nameElement: React.ReactNode;
  if (isFormOpen) {
    // show label name (or 'Label preview') if form is open
    nameElement = name.length > 0 ? name : 'Label preview';
  } else {
    // show link if label form is not open for edits
    nameElement = (
      <Link to="/dashboard" onClick={setItemsFilter}>
        {name}
      </Link>
    );
  }

  const itemCount = label.itemCount;
  return (
    <div key={label.id}>
      {nameElement}
      {/* todo remove this space later */}{' '}
      {itemCount > 0 && (
        <span>
          {itemCount} item{itemCount > 1 && 's'}
        </span>
      )}
      {!isFormOpen && <button onClick={toggleForm}>Edit</button>}
      <button onClick={() => dispatch(deleteLabel(label.id))}>Delete</button>
      {isFormOpen && (
        <LabelForm
          label={label}
          onSubmit={label => dispatch(updateLabel(label))}
          toggleForm={toggleForm}
          setLabelEntryName={setName}
        />
      )}
    </div>
  );
};

export default LabelEntry;
