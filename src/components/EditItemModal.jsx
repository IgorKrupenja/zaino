import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation, Redirect, withRouter, Link } from 'react-router-dom';
import Modal from 'react-modal';

import { editItem } from '../slices/items';
import ItemForm from './ItemForm';
import { history } from '../routers/AppRouter';

const EditItemModal = () => {
  // hide modal if location is not 'edit'
  const location = useLocation();
  if (location.pathname.match(/add|dashboard/)) {
    return null;
  }

  Modal.setAppElement('#app');
  const closeModal = () => history.push('/dashboard');

  const selectedItem = useSelector(state => state.items.find(item => item.id === useParams().id));
  // redirect to Dashboard if item id is invalid
  if (!selectedItem) return <Redirect to="/dashboard" />;

  const dispatch = useDispatch();
  return (
    // treat modal as always open (if location is 'edit')
    <Modal isOpen={true} onRequestClose={closeModal} contentLabel="Edit item">
      <h2>Edit item</h2>
      <ItemForm
        item={selectedItem}
        onSubmit={updates => dispatch(editItem({ id: selectedItem.id, ...updates }))}
      />
      <button onClick={closeModal}>close</button>
    </Modal>
  );
};

export default EditItemModal;
