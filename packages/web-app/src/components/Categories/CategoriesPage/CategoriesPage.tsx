import React from 'react';
import { useSelector } from 'react-redux';
import selectFilteredCategories, { selectCategoryCount } from '../../../state/selectors/categories';
import { RootState } from '../../../state/store';
import { CollectionFilters } from '../../Common/Filters/CollectionFilters';
import { Loader } from '../../Common/Misc/Loader';
import { ScrollablePage } from '../../Common/Misc/ScrollablePage';
import {
  setCategoryTextFilter,
  sortCategoriesBy,
  resetCategoryFilters,
} from '../../../state/slices/categoriesFilters';

export const CategoriesPage = () => {
  document.title = 'Categories | Zaino';
  const isLoading = useSelector((state: RootState) => state.dataLoader.isLoading);
  const categories = useSelector((state: RootState) => selectFilteredCategories(state));
  const categoryCount = categories.length;
  const totalCategoryCount = useSelector((state: RootState) => selectCategoryCount(state));

  return (
    <ScrollablePage>
      <CollectionFilters
        setTextFilter={setCategoryTextFilter}
        sort={sortCategoriesBy}
        resetFilters={resetCategoryFilters}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>count: {categoryCount}</div>
          <div>
            {categories.map(c => (
              <div>
                {c.name} -- {c.itemTotalCount} total -- {c.itemUniqueCount} unique
              </div>
            ))}
          </div>
          <div>{JSON.stringify(categories)}</div>
        </>
      )}
    </ScrollablePage>
  );
};
