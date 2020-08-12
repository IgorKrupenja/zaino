import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { deleteItem, updateItem } from '../../slices/items';
import { decrementItemCount } from '../../slices/labels';
import { Item } from '../../types/items';
import { closeModal } from '../../utils/closeModal';
import ItemForm from './ItemForm';

type LocationState = {
  item: Item;
};

const EditItem = () => {
  const location = useLocation<LocationState>();
  // hide modal if location is not 'edit'
  if (location.pathname.match(/add|dashboard/g)) return null;

  // redirect to Dashboard if item id is invalid
  // Redirect is better than history.push here
  // as history stack will not be populated with edit/invalid-id
  if (!location.state) return <Redirect to="/dashboard" />;
  const item: Item = location.state.item as Item;

  const dispatch = useDispatch();
  const title = `${item.name} | Zaino`;
  document.title = title;
  Modal.setAppElement('#app');

  return (
    // treat modal as always open (if location is 'edit')
    <Modal isOpen onRequestClose={closeModal} contentLabel={title}>
      <h2>{title}</h2>
      <ItemForm
        item={item}
        onSubmit={(item: Item) => {
          closeModal();
          dispatch(updateItem({ ...item }));
        }}
      />
      <button
        onClick={() => {
          closeModal();
          item.labels?.forEach(label => dispatch(decrementItemCount(label)));
          dispatch(deleteItem(item.id));
        }}
      >
        Delete item
      </button>
      <button onClick={closeModal}>close</button>
    </Modal>
  );
};

// wrapping in withRouter HOC to access props.location.state
export default EditItem;
