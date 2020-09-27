import { Item } from '@zaino/shared/';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useToggle from '../../../hooks/useToggle';
import { deleteItem, updateItem } from '../../../state/slices/items';
import { closeModal } from '../../../utils/closeModal';
import { Button } from '../../Controls/Button';
import { CloseButton } from '../../Controls/CloseButton';
import { Corkscrew } from '../../Misc/Corkscrew';
import { SectionHeader } from '../../Misc/SectionHeader';
import { Popover } from '../../Popover/Popover';
import { PopoverContent } from '../../Popover/PopoverContent';
import { PopoverHeader } from '../../Popover/PopoverHeader';
import { ItemForm } from '../ItemForm/';
import { Modal } from '../Modal';

export const EditItem = ({ item }: { item: Item }) => {
  const dispatch = useDispatch();
  const [isPopoverOpen, togglePopover] = useToggle();
  const [title, setTitle] = useState(item.name);

  document.title = `${title ? title : 'No name'} | Zaino`;

  return (
    <Modal isOpen onRequestClose={closeModal} contentLabel={title}>
      {/* header */}
      <SectionHeader>
        <h2 className={`section-header__title${title ? '' : ' section-header__title--grey'}`}>
          {!title ? 'No name' : title === 'CORKSCREW' ? <Corkscrew /> : title}
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
                The item will be deleted from inventory
                {item.packQuantity > 0 ? ' and pack' : ''}. There is no undo.
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
