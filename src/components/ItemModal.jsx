import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import ItemForm from './ItemForm';
import { history } from '../routers/AppRouter';

export const closeModal = () => {
  // restore title after closing
  document.title = 'Zaino';
  history.push('/dashboard');
};

const ItemModal = ({ item, title, onSubmit, children }) => {
  // set appropriate page title once when component is first rendered
  useEffect(() => {
    document.title = `${item ? item.name : title} | Zaino`;
  }, []);

  Modal.setAppElement('#app');

  const dispatch = useDispatch();
  return (
    // treat modal as always open (if location is 'edit')
    <Modal isOpen onRequestClose={closeModal} contentLabel={title}>
      <h2>{title}</h2>
      <ItemForm
        item={item}
        onSubmit={item => {
          closeModal();
          dispatch(onSubmit(item));
        }}
      />
      {children}
      <button onClick={closeModal}>close</button>
    </Modal>
  );
};

export default ItemModal;
