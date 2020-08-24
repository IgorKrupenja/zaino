import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { deleteItem, updateItem } from '../../state/slices/items';
import { decrementItemCount } from '../../state/slices/labels';
import { Item } from '../../types/Item';
import setupModal from '../../utils/setupModal';
import PopoverContainer from '../common/PopoverContainer';
import ItemForm from './ItemForm';

type LocationState = {
  item: Item;
};

const EditItemModal = () => {
  const location = useLocation<LocationState>();
  const dispatch = useDispatch();

  // redirect to Dashboard if item id is invalid
  // Redirect is better than history.push here
  // as history stack will not be populated with edit/invalid-id
  if (!location.state) return <Redirect to="/dashboard" />;

  const item = location.state.item;
  const [title, closeModal] = setupModal(item);

  return (
    <Modal isOpen onRequestClose={closeModal} contentLabel={title}>
      <h2>{title}</h2>
      <ItemForm
        item={item}
        onSubmit={(item: Item) => {
          closeModal();
          dispatch(updateItem({ ...item }));
        }}
      />
      <button onClick={closeModal}>close</button>
      <PopoverContainer
        heading="Delete item?"
        text={`The item will be deleted from inventory${
          item.packQuantity > 0 ? ' and pack' : ''
        }. There is no undo.`}
        buttonAction={() => {
          closeModal();
          item.labelIds?.forEach(labelId => dispatch(decrementItemCount(labelId)));
          dispatch(deleteItem(item.id));
        }}
      />
    </Modal>
  );
};

export default EditItemModal;
