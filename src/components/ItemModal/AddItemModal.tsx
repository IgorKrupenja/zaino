import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addItem } from '../../slices/items';
import { Item } from '../../types/items';
import { closeModal } from '../../utils/closeModal';
import ItemForm from './ItemForm';

export const AddItemModal = () => {
  const dispatch = useDispatch();
  // hide modal if location is not 'add'
  if (useLocation().pathname.match(/edit|dashboard/g)) return null;

  const title = 'Add item';
  document.title = title;
  Modal.setAppElement('#app');

  return (
    // show modal only if location is 'add'
    <Modal isOpen closeTimeoutMS={500} onRequestClose={closeModal} contentLabel={title}>
      <h2>{title}</h2>
      <ItemForm
        onSubmit={(item: Item) => {
          closeModal();
          dispatch(addItem(item));
        }}
      />
      <button onClick={closeModal}>close</button>
    </Modal>
  );
};

export default AddItemModal;
