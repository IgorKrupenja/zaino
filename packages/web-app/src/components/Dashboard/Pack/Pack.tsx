import { Item } from '@zaino/shared/';
import React, { useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { selectFilteredPackItems } from '../../../state/selectors/items';
import { selectPackItemsStats } from '../../../state/selectors/itemsStats';
import { RootState } from '../../../state/store';
import { SectionHeader } from '../../Misc/SectionHeader';
import { List } from '../List';
import { PackItem } from '../PackItem';
import { Stats } from '../Stats';

export const Pack = () => {
  const items = useSelector((state: RootState) => selectFilteredPackItems(state), shallowEqual);
  const stats = useSelector((state: RootState) => selectPackItemsStats(state), shallowEqual);

  return (
    <>
      <SectionHeader className="section-header--large-margin">
        <div>
          <h2 className="section-header__title">Pack</h2>
          <Stats stats={stats} />
        </div>
      </SectionHeader>
      <List title="pack" filteredItemCount={items.length} allItemCount={stats.allItemUniqueCount}>
        {useMemo(() => items.map((item: Item) => <PackItem key={item.id} {...item} />), [items])}
      </List>
    </>
  );
};
