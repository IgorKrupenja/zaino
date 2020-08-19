import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { addItem } from '../../slices/items';
import { Item } from '../../types/items';
import setupModal from '../../utils/setupModal';
import ItemForm from './ItemForm';

export const AddItemModal = () => {
  const dispatch = useDispatch();

  const [title, closeModal] = setupModal();

  return (
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
