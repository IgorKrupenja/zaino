import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Redirect, withRouter } from 'react-router-dom';
import Modal from 'react-modal';

import { editItem, deleteItem } from '../slices/items';
import ItemForm from './ItemForm';

import { history } from '../routers/AppRouter';

const EditItemModal = props => {
  // hide modal if location is not 'edit'
  const location = useLocation();
  if (location.pathname.match(/add|dashboard/)) {
    return null;
  }

  Modal.setAppElement('#app');
  const closeModal = () => {
    // restore title after closing
    document.title = 'Zaino';
    history.push('/dashboard');
  };

  // redirect to Dashboard if item id is invalid
  // Redirect is better than history.push here
  // as history stack will not be populated with edit/invalid-id
  if (!props.location.state) return <Redirect to="/dashboard" />;
  const item = props.location.state.item;

  const dispatch = useDispatch();
  return (
    // treat modal as always open (if location is 'edit')
    <Modal isOpen onRequestClose={closeModal} contentLabel="Edit item">
      <h2>Edit item</h2>
      <ItemForm
        item={item}
        onSubmit={updates => {
          closeModal();
          dispatch(editItem({ id: item.id, ...updates }));
        }}
      />
      <button
        onClick={() => {
          closeModal();
          dispatch(deleteItem(item.id));
        }}
      >
        Delete item
      </button>
      <button onClick={closeModal}>close</button>
    </Modal>
  );
};

// wrapping in withRouter HOC to access props.location.state passed from list item
export default withRouter(EditItemModal);
