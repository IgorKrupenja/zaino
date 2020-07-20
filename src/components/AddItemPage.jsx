import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, useLocation } from 'react-router-dom';
import { addItem } from '../slices/items';
import ItemForm from './ItemForm';

const AddItemPage = () => {
  const location = useLocation();
  if (location.pathname.match(/dashboard|edit/)) {
    return null;
  }

  const dispatch = useDispatch();
  return (
    <>
      <h2>Add item</h2>
      <ItemForm onSubmit={item => dispatch(addItem(item))} />
    </>
  );
};

export default AddItemPage;
