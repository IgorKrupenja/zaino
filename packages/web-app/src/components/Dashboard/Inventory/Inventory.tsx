import { Item } from '@zaino/shared/';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import selectFilteredInventoryItems from '../../../state/selectors/items';
import { selectInventoryItemsStats } from '../../../state/selectors/itemsStats';
import { RootState } from '../../../state/store';
import { SectionHeader } from '../../Misc/SectionHeader';
import { ColumnWrapper } from '../../Wrappers/ColumnWrapper';
import { InventoryItem } from '../InventoryItem';
import { Stack } from '../Stack';
import { Stats } from '../Stats';
import './style.scss';

/**
 * Component that holds inventory items state and passes these as InventoryItems to Stack.
 */
export const Inventory = () => {
  // a bit of a hack: shallowEqual prevents re-renders when items in store do not change
  // (i.e. new filter conditions result in the same matching items)
  // https://react-redux.js.org/api/hooks#equality-comparisons-and-updates
  const items = useSelector(
    (state: RootState) => selectFilteredInventoryItems(state),
    shallowEqual
  );
  const stats = useSelector((state: RootState) => selectInventoryItemsStats(state), shallowEqual);

  return (
    <Stack className="stack--left">
      <SectionHeader className="section-header--large-margin">
        <ColumnWrapper>
          <SectionHeader.Title>Inventory</SectionHeader.Title>
          <Stats className="section-header__content" stats={stats} />
        </ColumnWrapper>
        {/* styling this Link as button */}
        <Link className="button button--link button--green inventory__new-item" to="/dashboard/new">
          New item
        </Link>
      </SectionHeader>
      {items.length > 0 ? (
        <Stack.List>
          {items.map((item: Item) => (
            <InventoryItem key={item.id} {...item} />
          ))}
        </Stack.List>
      ) : (
        <Stack.List isEmpty>
          No {stats.allItemUniqueCount > 0 && 'matching '}items in inventory
        </Stack.List>
      )}
    </Stack>
  );
};
