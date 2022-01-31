import { Item } from '@zaino/shared';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { useCloseModal } from '../../../hooks/useCloseModal';
import { useTitle } from '../../../hooks/useTitle';
import { addItem } from '../../../state/slices/itemsSlice';
import { RootState } from '../../../state/store';
import { Button } from '../../Common/Controls/Button';
import { CloseButton } from '../../Common/Controls/CloseButton';
import { SectionHeader } from '../../Common/Misc/SectionHeader';
import { ItemForm } from '../ItemForm';
import { Modal } from '../Modal';
import './style.scss';

export const NewItem = () => {
  const dispatch = useDispatch();
  const closeModal = useCloseModal();
  const categories = useSelector((state: RootState) => state.categories);

  const newItem: Item = {
    id: uuid(),
    name: '',
    categoryId: categories.find((category) => category.isDefault)?.id ?? categories[0].id,
    weight: '',
    quantity: 1,
    packQuantity: 0,
    addedAt: '',
  };

  const title = 'New item';
  useTitle(`${title} | Zaino`);

  return (
    <Modal isOpen onRequestClose={closeModal} contentLabel={title}>
      <SectionHeader>
        <SectionHeader.Title>{title}</SectionHeader.Title>
        <CloseButton className="close-button--large" onClick={closeModal} />
      </SectionHeader>
      <ItemForm
        item={newItem}
        onSubmit={(item: Item) => {
          closeModal();
          dispatch(addItem(item));
        }}
      >
        <Button className="button--green item-form__full-width new-item__button" submit>
          Create new item
        </Button>
      </ItemForm>
    </Modal>
  );
};
