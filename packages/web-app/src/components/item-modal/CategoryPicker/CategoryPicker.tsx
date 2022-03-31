import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { Column } from '../../common/containers/Column';
import { Row } from '../../common/containers/Row';
import { Button } from '../../common/controls/Button';
import { EditIcon } from '../../common/icons/EditIcon';
import { CategoryImage } from '../../common/misc/CategoryImage';
import { CategorySelect } from '../../common/selects/CategorySelect';
import './style.scss';

type CategoryPickerProps = {
  categoryId?: string;
  onChange: (categoryName: string) => void;
};

/**
 * Category picker with Select, CategoryImage etc.
 * Extracted into a separate component to make ItemForm more readable.
 * Can possibly used elsewhere in the future?
 */
export const CategoryPicker = ({ categoryId, onChange }: CategoryPickerProps) => {
  const categories = useSelector((state: RootState) => state.categories);
  const categoryName = categories.find((category) => category.id === categoryId)?.name;

  return (
    <Column className="category-picker">
      {/* Select */}
      <CategorySelect
        popoverAlign="center"
        selectedCategoryId={categoryId}
        headerText="Select category"
        onChange={onChange}
      >
        <Button className="button--transparent button--small">
          Category
          <EditIcon />
        </Button>
      </CategorySelect>
      <Row>
        {/* Category image */}
        <CategoryImage categoryId={categoryId} />
        {/* Category name */}
        <div className="category-picker__name">{categoryName}</div>
      </Row>
    </Column>
  );
};
