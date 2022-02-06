import { useSelector } from 'react-redux';
import { useToggle } from '../../../hooks';
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
import { CollectionFilters } from '../../Common/Filters/CollectionFilters';
import { Loader } from '../../Common/Misc/Loader';
import { ScrollablePage } from '../../Common/Misc/ScrollablePage';
import { SectionHeader } from '../../Common/Misc/SectionHeader';
import { Column } from '../../Common/Wrappers/Column';
import { List } from '../../Labels/List/List';

// TODO: unfinished
export const CategoriesPage = () => {
  document.title = 'Categories | Zaino';
  const isLoading = useSelector((state: RootState) => state.demoData.isLoading);
  const categories = useSelector((state: RootState) => selectFilteredCategories(state));
  const categoryCount = categories.length;
  const totalCategoryCount = useSelector((state: RootState) => selectCategoryCount(state));
  const [isFormOpen, toggleForm] = useToggle();

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
