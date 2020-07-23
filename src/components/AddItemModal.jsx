import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, useLocation } from 'react-router-dom';
import Modal from 'react-modal';

import { addItem } from '../slices/items';
import ItemForm from './ItemForm';
import { history } from '../routers/AppRouter';

const AddItemModal = () => {
  // hide  modal if location is not 'add'
  const location = useLocation();
  if (location.pathname.match(/dashboard|edit/)) {
    return null;
  }

  Modal.setAppElement('#app');
  const closeModal = () => {
    // restore title after closing
    document.title = 'Zaino';
    history.push('/dashboard');
  };

  const dispatch = useDispatch();
  return (
    // treat modal as always open (if location is 'add')
    <Modal isOpen onRequestClose={closeModal} contentLabel="Add item">
      <h2>Add item</h2>
      <ItemForm
        onSubmit={item => {
          closeModal();
          dispatch(addItem(item));
        }}
      />
      <button onClick={closeModal}>close</button>
    </Modal>
  );
};

export default AddItemModal;
