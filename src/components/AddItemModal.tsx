import React from 'react';
import { useLocation } from 'react-router-dom';
import { addItem } from '../slices/items';
import ItemModal from './ItemModal';
import { Item } from '../types/types';

export const AddItemModal = () => {
  // hide modal if location is not 'add'
  if (useLocation().pathname.match(/dashboard|edit/g)) return null;

  return <ItemModal onSubmit={(item: Item) => addItem(item)} title="Add item"></ItemModal>;
};

export default AddItemModal;
