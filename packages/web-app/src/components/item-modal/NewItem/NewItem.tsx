import { Item } from '@zaino/shared';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { useCloseModal, useTitle } from '../../../hooks';
import { addItem } from '../../../state/slices/itemsSlice';
import { RootState } from '../../../state/store';
import { Button } from '../../common/controls/Button';
import { CloseButton } from '../../common/controls/CloseButton';
import { SectionHeader } from '../../common/misc/SectionHeader';
import { ItemForm } from '../ItemForm';
import { Modal } from '../Modal';
import './NewItem.scss';

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
        {/* todo variant in child */}
        <CloseButton className="close-button--large" onClick={closeModal} />
      </SectionHeader>
      <ItemForm
        item={newItem}
        onSubmit={(item: Item) => {
          closeModal();
          dispatch(addItem(item));
        }}
      >
        <Button className="new-item__button" submit>
          Create new item
        </Button>
      </ItemForm>
    </Modal>
  );
};
