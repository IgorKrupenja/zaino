import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation, Redirect } from 'react-router-dom';
import { editItem } from '../slices/items';
import ItemForm from './ItemForm';

// todo not ready
const EditItemPage = () => {
  // hide if Link is not edit
  const location = useLocation();
  if (location.pathname.match(/dashboard|add/)) {
    return null;
  }

  const selectedItem = useSelector(state => state.items.find(item => item.id === useParams().id));
  // redirect to Dashboard if item id is invalid
  if (!selectedItem) return <Redirect to="/dashboard" />;

  const dispatch = useDispatch();
  return (
    <>
      <h2>Edit item</h2>
      <ItemForm
        item={selectedItem}
        onSubmit={updates => dispatch(editItem({ id: selectedItem.id, ...updates }))}
      />
    </>
  );
};

export default EditItemPage;
