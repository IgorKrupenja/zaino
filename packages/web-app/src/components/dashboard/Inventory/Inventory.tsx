import './Inventory.scss';

import { Item } from '@zaino/shared';
import { shallowEqual, useSelector } from 'react-redux';

import { selectFilteredInventoryItems } from '../../../state/selectors/itemsSelector';
import { selectInventoryItemsStats } from '../../../state/selectors/itemsStatsSelector';
import { RootState } from '../../../state/types';
import { Column } from '../../common/containers/Column';
import { Button } from '../../common/controls/Button';
import { SectionHeader } from '../../common/misc/SectionHeader';
import { InventoryItem } from '../InventoryItem';
import { Stack } from '../Stack';
import { Stats } from '../Stats';

export const Inventory = () => {
  // shallowEqual prevents re-renders when items in store do not change
  // (i.e. new filter conditions result in the same matching items).
  // https://react-redux.js.org/api/hooks#equality-comparisons-and-updates
  const items = useSelector(
    (state: RootState) => selectFilteredInventoryItems(state),
    shallowEqual
  );
  const stats = useSelector((state: RootState) => selectInventoryItemsStats(state), shallowEqual);

  return (
    <Stack className="inventory">
      <SectionHeader variant="large-margin">
        <Column>
          <SectionHeader.Title>Inventory</SectionHeader.Title>
          <Stats className="inventory__stats " stats={stats} />
        </Column>
        <Button
          className="inventory__new-item"
          linkTo="/dashboard/new"
          size="large"
          variant="primary"
        >
          New item
        </Button>
      </SectionHeader>
      <Stack.List isEmpty={items.length === 0}>
        {items.length > 0
          ? items.map((item: Item) => <InventoryItem key={item.id} {...item} />)
          : `No ${stats.allItemUniqueCount > 0 ? 'matching ' : ''}items in inventory`}
      </Stack.List>
    </Stack>
  );
};
