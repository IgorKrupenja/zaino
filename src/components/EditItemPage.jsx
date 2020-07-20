import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { editItem } from '../slices/items';
import ItemForm from './ItemForm';

// todo not ready
const EditItemPage = () => {
  const location = useLocation();
  if (location.pathname.match(/dashboard|add/)) {
    return null;
  }

  const selectedItem = useSelector(state => state.items.find(item => item.id === useParams().id));
  const dispatch = useDispatch();
  const onSubmit = updates => {};
  return (
    <>
      <h2>Edit item</h2>
      <ItemForm
        item={selectedItem}
        onSubmit={updates => dispatch(editItem({ id: selectedItem.id, ...updates }))}
      />
    </>
  );
  // return JSON.stringify(selectedItem);
};

export default EditItemPage;
