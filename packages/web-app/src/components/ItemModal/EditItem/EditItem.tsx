import { Item } from '@zaino/shared/';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useToggle from '../../../hooks/useToggle';
import { history } from '../../../routers/AppRouter';
import { deleteItem, updateItem } from '../../../state/slices/items';
import { Button } from '../../misc/Button';
import { CloseButton } from '../../misc/CloseButton';
import { SectionHeader } from '../../misc/SectionHeader';
import { Popover } from '../../Popover/Popover';
import { PopoverContent } from '../../Popover/PopoverContent';
import { PopoverHeader } from '../../Popover/PopoverHeader';
import { ItemForm } from '../ItemForm/';
import { Modal } from '../Modal';

type LocationState = {
  item: Item;
};

export const EditItem = () => {
  const location = useLocation<LocationState>();
  const dispatch = useDispatch();
  const [isPopoverOpen, togglePopover] = useToggle();
  const item = location.state.item;
  const [title, setTitle] = useState(item.name);

  document.title = `${title.length > 0 ? title : 'No name'} | Zaino`;
  const closeModal = () => history.push('/dashboard');

  return (
    <Modal isOpen onRequestClose={closeModal} contentLabel={title}>
      {/* header */}
      <SectionHeader>
        <h2 className={`section-header__title${title ? '' : ' section-header__title--grey'}`}>
          {title ? title : 'No name'}
        </h2>
        <CloseButton className="close-button--large" onClick={closeModal} />
      </SectionHeader>
      {/* item form */}
      <ItemForm
        item={item}
        onSubmit={(item: Item) => {
          closeModal();
          dispatch(updateItem({ ...item }));
        }}
        setTitle={setTitle}
      >
        {/* Save/submit button */}
        <Button className="button--green item-form__half-width" submit>
          Save changes
        </Button>
        {/* delete button with popover */}
        <Popover
          isOpen={isPopoverOpen}
          onClickOutside={togglePopover}
          containerClassName="popover-container--wide"
          content={
            <>
              <PopoverHeader text="Delete item?">
                <CloseButton className="close-button--large-padding" onClick={togglePopover} />
              </PopoverHeader>
              <PopoverContent>
                <p>
                  The item will be deleted from inventory
                  {item.packQuantity > 0 ? ' and pack' : ''}. There is no undo.
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
          <Button className="button--red item-form__half-width" onClick={togglePopover}>
            Delete
          </Button>
        </Popover>
      </ItemForm>
    </Modal>
  );
};
