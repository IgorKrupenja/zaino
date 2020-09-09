import { Item } from '@zaino/shared/';
import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { history } from '../../routers/AppRouter';
import { addItem } from '../../state/slices/items';
import ItemForm from './ItemForm';

export const AddItemModal = () => {
  const dispatch = useDispatch();

  const title = 'Add item | Zaino';
  document.title = title;
  Modal.setAppElement('#app');
  const closeModal = () => history.push('/dashboard');

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
