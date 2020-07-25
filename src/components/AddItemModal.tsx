import React from 'react';
import { useLocation } from 'react-router-dom';
import { addItem } from '../slices/items';
import ItemModal from './ItemModal';
import { NewItemEvent } from '../types/types';

export const AddItemModal = () => {
  // hide modal if location is not 'add'
  if (useLocation().pathname.match(/dashboard|edit/)) return null;

  return <ItemModal onSubmit={(item: NewItemEvent) => addItem(item)} title="Add item"></ItemModal>;
};

export default AddItemModal;
