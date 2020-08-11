import List from './List';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../store/store';
import { selectFilteredPackItems } from '../../selectors/items';
import { Item } from '../../types/items';
import PackListItem from './PackListItem';
import { selectPackItemsStats } from '../../selectors/itemsStats';
import React from 'react';
import Stats from './Stats';

const Pack = () => {
  const items = useSelector(
    (state: RootState) => selectFilteredPackItems(state),
    shallowEqual
  ).map((item: Item) => <PackListItem key={item.id} {...item} />);

  const itemStats = useSelector((state: RootState) => selectPackItemsStats(state), shallowEqual);

  return (
    <section className={`list list--pack`}>
      <h2>Pack</h2>
      <Stats
        filteredItemCount={items.length}
        totalItemCount={itemStats.totalItemCount}
        weight={itemStats.weight}
        percentageOfTotal={itemStats.percentageOfTotal}
      />
      <List
        items={items}
        title={'pack'}
        filteredItemCount={items.length}
        totalItemCount={itemStats.totalItemCount}
      />
    </section>
  );
};

export default Pack;
