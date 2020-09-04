import { Item } from '@zaino/shared/';
import React, { useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { selectFilteredPackItems } from '../../state/selectors/items';
import { selectPackItemsStats } from '../../state/selectors/itemsStats';
import { RootState } from '../../state/store';
import List from './List';
import PackListItem from './PackListItem';
import Stats from './Stats';

const Pack = () => {
  const items = useSelector((state: RootState) => selectFilteredPackItems(state), shallowEqual);
  const itemStats = useSelector((state: RootState) => selectPackItemsStats(state), shallowEqual);

  return (
    <section className="pack">
      <h2>Pack</h2>
      <Stats
        weight={itemStats.weight}
        percentageOfTotal={itemStats.percentageOfTotal}
        filteredItemTotalCount={itemStats.filteredItemTotalCount}
        filteredItemUniqueCount={itemStats.filteredItemUniqueCount}
        allItemUniqueCount={itemStats.allItemUniqueCount}
      />
      <List
        title="pack"
        filteredItemCount={items.length}
        allItemCount={itemStats.allItemUniqueCount}
      >
        {useMemo(() => items.map((item: Item) => <PackListItem key={item.id} {...item} />), [
          items,
        ])}
      </List>
    </section>
  );
};

export default Pack;
