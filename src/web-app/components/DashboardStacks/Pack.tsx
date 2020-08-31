import React, { useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Item from '../../../common/types/Item';
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
        filteredItemCount={itemStats.filteredItemCount}
        totalItemCount={itemStats.allItemCount}
        weight={itemStats.weight}
        percentageOfTotal={itemStats.percentageOfTotal}
      />
      <List title="pack" filteredItemCount={items.length} totalItemCount={itemStats.allItemCount}>
        {useMemo(() => items.map((item: Item) => <PackListItem key={item.id} {...item} />), [
          items,
        ])}
      </List>
    </section>
  );
};

export default Pack;
