import { Item } from '@zaino/shared/';
import React from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import Categories from '../../../constants/Categories';
import { history } from '../../../routers/AppRouter';
import { addItem } from '../../../state/slices/items';
import { Button } from '../../misc/Button';
import { CloseButton } from '../../misc/CloseButton';
import { ItemForm } from '../ItemForm/';
import { Modal } from '../Modal';
import { ModalHeader } from '../ModalHeader';

export const AddItem = () => {
  const dispatch = useDispatch();

  const newItem: Item = {
    id: uuid(),
    name: '',
    categoryName: Categories[0].name,
    weight: '',
    quantity: 1,
    packQuantity: 0,
    addedAt: '',
  };

  const title = 'Add item';
  document.title = `${title} | Zaino`;
  const closeModal = () => history.push('/dashboard');

  return (
    <Modal isOpen onRequestClose={closeModal} contentLabel={title}>
      <ModalHeader>
        <h2 className="modal-header__title">{title}</h2>
        <CloseButton className="close-button--large" onClick={closeModal} />
      </ModalHeader>
      <ItemForm
        item={newItem}
        onSubmit={(item: Item) => {
          closeModal();
          dispatch(addItem(item));
        }}
      >
        <Button className="button--no-margin" submit>
          Create item
        </Button>
      </ItemForm>
    </Modal>
  );
};
