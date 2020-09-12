import { Item } from '@zaino/shared/';
import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import useToggle from '../../hooks/useToggle';
import { history } from '../../routers/AppRouter';
import { deleteItem, updateItem } from '../../state/slices/items';
import { CloseButton } from '../misc/CloseButton';
import { Popover } from '../misc/Popover';
import { PopoverHeader } from '../misc/PopoverHeader';
import ItemForm from './ItemForm';

type LocationState = {
  item: Item;
};

const EditItemModal = () => {
  const location = useLocation<LocationState>();
  const dispatch = useDispatch();
  const [isPopoverOpen, togglePopover] = useToggle();

  // redirect to Dashboard if item id is invalid
  // Redirect is better than history.push here
  // as history stack will not be populated with edit/invalid-id
  if (!location.state) return <Redirect to="/dashboard" />;

  const item = location.state.item;
  const title = `${item.name} | Zaino`;
  document.title = title;
  Modal.setAppElement('#app');
  const closeModal = () => history.push('/dashboard');

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
      <CloseButton onClick={closeModal} />
      <Popover
        isOpen={isPopoverOpen}
        onClickOutside={togglePopover}
        content={
          <>
            <PopoverHeader text="Delete item?">
              <CloseButton onClick={togglePopover} />
            </PopoverHeader>
            <p>
              The item will be deleted from inventory{item.packQuantity > 0 ? ' and pack' : ''}.
              There is no undo.
            </p>
            <button
              onClick={() => {
                closeModal();
                dispatch(deleteItem(item));
              }}
            >
              Delete
            </button>
          </>
        }
      >
        <button onClick={togglePopover}>Delete</button>
      </Popover>
    </Modal>
  );
};

export default EditItemModal;
