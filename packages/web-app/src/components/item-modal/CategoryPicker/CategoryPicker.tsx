import './CategoryPicker.scss';

import { useSelector } from 'react-redux';

import { RootState } from '../../../state/types';
import { Column } from '../../common/containers/Column';
import { Row } from '../../common/containers/Row';
import { Button } from '../../common/controls/Button';
import { EditIcon } from '../../common/icons/EditIcon';
import { CategoryImage } from '../../common/misc/CategoryImage';
import { CategorySelect } from '../../common/selects/CategorySelect';

type CategoryPickerProps = {
  categoryId?: string;
  onChange: (categoryName: string) => void;
};

export const CategoryPicker = ({ categoryId, onChange }: CategoryPickerProps) => {
  const categories = useSelector((state: RootState) => state.categories);
  const categoryName = categories.find((category) => category.id === categoryId)?.name;

  return (
    <Column className="category-picker">
      <CategorySelect
        headerText="Select category"
        onChange={onChange}
        popoverAlign="center"
        selectedCategoryId={categoryId}
      >
        <Button size="small" variant="transparent">
          Category
          <EditIcon />
        </Button>
      </CategorySelect>
      <Row>
        <CategoryImage categoryId={categoryId} />
        <div className="category-picker__name">{categoryName}</div>
      </Row>
    </Column>
  );
};
