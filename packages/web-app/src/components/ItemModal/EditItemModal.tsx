import { Item } from '@zaino/shared/';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import useToggle from '../../hooks/useToggle';
import { history } from '../../routers/AppRouter';
import { deleteItem, updateItem } from '../../state/slices/items';
import { Button } from '../misc/Button';
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
  const item = location.state.item;
  const [title, setTitle] = useState(item.name);

  // redirect to Dashboard if item id is invalid
  // Redirect is better than history.push here
  // as history stack will not be populated with edit/invalid-id
  if (!location.state) return <Redirect to="/dashboard" />;

  document.title = `${title} | Zaino`;
  Modal.setAppElement('#app');
  const closeModal = () => history.push('/dashboard');

  return (
    <Modal isOpen onRequestClose={closeModal} contentLabel={title}>
      {/* todo possibly a common component */}
      {/* header */}
      <h2>
        {title}
        <CloseButton onClick={closeModal} />
      </h2>
      {/* item form */}
      <ItemForm
        item={item}
        onSubmit={(item: Item) => {
          closeModal();
          dispatch(updateItem({ ...item }));
        }}
        setTitle={setTitle}
      >
        <Button submit>Save changes</Button>
        {/* delete button with popover */}
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
              <Button
                className="button--red"
                onClick={() => {
                  closeModal();
                  dispatch(deleteItem(item));
                }}
              >
                Delete
              </Button>
            </>
          }
        >
          <Button className="button--red" onClick={togglePopover}>
            Delete
          </Button>
        </Popover>
      </ItemForm>
    </Modal>
  );
};

export default EditItemModal;
