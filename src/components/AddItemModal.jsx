import React from 'react';
import { useLocation } from 'react-router-dom';
import { addItem } from '../slices/items';
import ItemModal from './ItemModal';

export const AddItemModal = () => {
  // hide modal if location is not 'add'
  const location = useLocation();
  if (location.pathname.match(/dashboard|edit/)) {
    return null;
  }

  return <ItemModal onSubmit={item => addItem(item)} title="Add item"></ItemModal>;
};

export default AddItemModal;
