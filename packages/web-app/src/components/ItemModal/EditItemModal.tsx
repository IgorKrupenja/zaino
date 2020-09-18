import { Item } from '@zaino/shared/';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useToggle from '../../hooks/useToggle';
import { history } from '../../routers/AppRouter';
import { deleteItem, updateItem } from '../../state/slices/items';
import { Button } from '../misc/Button';
import { CloseButton } from '../misc/CloseButton';
import { Popover } from '../Popover/Popover';
import { PopoverContent } from '../Popover/PopoverContent';
import { PopoverHeader } from '../Popover/PopoverHeader';
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
          containerClassName="popover-container--wide"
          content={
            <>
              <PopoverHeader text="Delete item?">
                <CloseButton className="close-button--large-margin" onClick={togglePopover} />
              </PopoverHeader>
              <PopoverContent>
                <p>
                  The item will be deleted from inventory{item.packQuantity > 0 ? ' and pack' : ''}.
                  There is no undo.
                </p>
              </PopoverContent>
              <Button
                className="button--red button--wide"
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
