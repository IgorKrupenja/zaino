import { Label } from '@zaino/shared/';
import React, { ReactNode, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useToggle from '../../../hooks/useToggle';
import { resetItemFilters, setItemLabelsFilter } from '../../../state/slices/itemsFilters';
import { updateLabel } from '../../../state/slices/labels';
import { Button } from '../../Controls/Button';
import { LabelForm } from '../LabelForm';
import './style.scss';

export const LabelDetails = (label: Label) => {
  const dispatch = useDispatch();
  const [isFormOpen, toggleForm] = useToggle();
  const [name, setName] = useState(label.name);
  const itemTotalCount = label.itemTotalCount;

  // extracted from return for clarity
  let nameElement: ReactNode;
  if (isFormOpen) {
    // show label name (or 'Label preview') if form is open
    nameElement = name.length > 0 ? name : 'Label preview';
  } else {
    // show link to dashboard if label form is not open for edits
    nameElement = (
      // set label filter on Dashboard
      <Link
        to="/dashboard"
        onClick={() => {
          dispatch(resetItemFilters());
          dispatch(setItemLabelsFilter([label.id]));
        }}
      >
        {name}
      </Link>
    );
  }

  return (
    <article key={label.id}>
      {nameElement}
      {/* item count */}
      {itemTotalCount ? (
        <span>
          {itemTotalCount} item{itemTotalCount > 1 && 's'} ({label.itemUniqueCount} unique)
        </span>
      ) : null}
      {!isFormOpen && <button onClick={toggleForm}>Edit</button>}
      {isFormOpen && (
        <LabelForm
          label={label}
          onSubmit={label => dispatch(updateLabel(label))}
          toggleForm={toggleForm}
          setLabelDetailsName={setName}
        >
          <Button className="button--green">Save changes</Button>
        </LabelForm>
      )}
    </article>
  );
};
