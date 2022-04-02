import { Item } from '@zaino/shared';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { useCloseModal, useTitle, useToggle } from '../../../hooks';
import { deleteItem, updateItem } from '../../../state/slices/itemsSlice';
import { RootState } from '../../../state/store';
import { Button } from '../../common/controls/Button';
import { CloseButton } from '../../common/controls/CloseButton';
import { Corkscrew } from '../../common/misc/Corkscrew';
import { Popover } from '../../common/misc/Popover';
import { SectionHeader } from '../../common/misc/SectionHeader';
import { ItemForm } from '../ItemForm';
import { Modal } from '../Modal';
import './style.scss';

export const EditItem = () => {
  const closeModal = useCloseModal();

  const { id } = useParams();
  const items = useSelector((state: RootState) => state.items);
  const item = items.find((item) => item.id === id);
  const [title, setTitle] = useState(item?.name ?? '');

  const dispatch = useDispatch();
  const [isPopoverOpen, togglePopover] = useToggle();
  useTitle(`${title ? title : 'No name'} | Zaino`);

  return item ? (
    <Modal isOpen onRequestClose={closeModal} contentLabel={title}>
      {/* header */}
      <SectionHeader>
        <SectionHeader.Title className={title.trim() ? '' : 'edit-item__header--grey'}>
          {!title.trim() ? 'No name' : title === 'CORKSCREW' ? <Corkscrew /> : title}
        </SectionHeader.Title>
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
        {/* delete button with popover */}
        <Popover
          isOpen={isPopoverOpen}
          onClickOutside={togglePopover}
          className="popover--wide"
          align="center"
          content={
            <>
              <Popover.Header>
                <Popover.Title>Delete item?</Popover.Title>
                <CloseButton onClick={togglePopover} />
              </Popover.Header>
              <Popover.Content>
                <Popover.Text>
                  The item will be deleted from inventory
                  {item.packQuantity > 0 ? ' and pack' : ''}. There is no undo.
                </Popover.Text>
                <Button
                  variant="secondary"
                  onClick={() => {
                    closeModal();
                    dispatch(deleteItem(item));
                  }}
                >
                  Delete
                </Button>
              </Popover.Content>
            </>
          }
        >
          <Button
            className="item-form__half-width edit-item__button-left"
            variant="secondary"
            onClick={togglePopover}
          >
            Delete
          </Button>
        </Popover>
        {/* Save/submit button */}
        <Button className="item-form__half-width edit-item__button-right" submit>
          Save changes
        </Button>
      </ItemForm>
    </Modal>
  ) : (
    <Navigate to="/dashboard" />
  );
};
