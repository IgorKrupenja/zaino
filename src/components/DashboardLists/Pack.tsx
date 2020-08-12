import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { selectFilteredPackItems } from '../../selectors/items';
import { selectPackItemsStats } from '../../selectors/itemsStats';
import { RootState } from '../../store/store';
import { Item } from '../../types/items';
import List from './List';
import PackListItem from './PackListItem';
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
