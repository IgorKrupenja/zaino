import { useSelector } from 'react-redux';
import { useTitle, useToggle } from '../../../hooks';
import {
  selectCategoryCount,
  selectFilteredCategories,
} from '../../../state/selectors/categoriesSlector';
import {
  resetCategoryFilters,
  setCategoryTextFilter,
  sortCategoriesBy,
} from '../../../state/slices/categoryFiltersSlice';
import { RootState } from '../../../state/store';
import { Column } from '../../common/containers/Column';
import { CollectionFilters } from '../../common/filters/CollectionFilters';
import { Loader } from '../../common/misc/Loader';
import { ScrollablePage } from '../../common/misc/ScrollablePage';
import { SectionHeader } from '../../common/misc/SectionHeader';
import { List } from '../../labels/List';

// TODO: unfinished
export const CategoriesPage = () => {
  useTitle('Categories | Zaino');

  const isLoading = useSelector((state: RootState) => state.demoData.isLoading);
  const categories = useSelector((state: RootState) => selectFilteredCategories(state));
  const categoryCount = categories.length;
  const totalCategoryCount = useSelector((state: RootState) => selectCategoryCount(state));
  const [isFormOpen] = useToggle();

  return (
    <ScrollablePage>
      <CollectionFilters
        setTextFilter={setCategoryTextFilter}
        sort={sortCategoriesBy}
        resetFilters={resetCategoryFilters}
        textFilterPlaceholder="Search categories"
      />
      {isLoading ? (
        <Loader />
      ) : (
        <List>
          {/* header with name, count and New category button */}
          <SectionHeader className="section-header--large-margin">
            <Column>
              <SectionHeader.Title>Categories</SectionHeader.Title>
              <SectionHeader.Content>
                {categoryCount} categor{categoryCount === 1 ? 'y' : 'ies'}
              </SectionHeader.Content>
            </Column>
          </SectionHeader>
          {categoryCount > 0 ? (
            categories.map((category) => (
              <div key={category.id}>
                {category.name} -- {category.itemTotalCount} total -- {category.itemUniqueCount}{' '}
                unique
              </div>
            ))
          ) : (
            <List.Empty className={isFormOpen ? 'list--empty--border' : ''}>{`No${
              categoryCount === totalCategoryCount ? '' : ' matching'
            } categories`}</List.Empty>
          )}
        </List>
      )}
    </ScrollablePage>
  );
};
