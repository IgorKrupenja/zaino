import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import ItemForm from './ItemForm';
import { history } from '../routers/AppRouter';
import { Item } from '../types/types';

export const closeModal = () => {
  // restore title after closing
  document.title = 'Zaino';
  history.push('/dashboard');
};

type ItemModalProps = {
  item?: Item;
  title: string;
  // todo TS any
  onSubmit: (item: Item) => void;
  children?: React.ReactChild;
};

const ItemModal = ({ item, title, onSubmit, children }: ItemModalProps) => {
  // set appropriate page title once when component is first rendered
  useEffect(() => {
    document.title = title;
  }, []);

  Modal.setAppElement('#app');

  const dispatch = useDispatch();
  return (
    // treat modal as always open (if location is 'edit')
    <Modal isOpen onRequestClose={closeModal} contentLabel={title}>
      <h2>{title}</h2>
      <ItemForm
        item={item}
        onSubmit={(item: Item) => {
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
