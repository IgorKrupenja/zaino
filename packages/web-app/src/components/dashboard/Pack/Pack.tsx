import './Pack.scss';

import { Item } from '@zaino/shared';
import { shallowEqual, useSelector } from 'react-redux';

import { selectFilteredPackItems } from '../../../state/selectors/itemsSelector';
import { selectPackItemsStats } from '../../../state/selectors/itemsStatsSelector';
import { RootState } from '../../../state/types';
import { Column } from '../../common/containers/Column';
import { SectionHeader } from '../../common/misc/SectionHeader';
import { PackItem } from '../PackItem';
import { Stack } from '../Stack';
import { Stats } from '../Stats';

export const Pack = () => {
  const items = useSelector((state: RootState) => selectFilteredPackItems(state), shallowEqual);
  const stats = useSelector((state: RootState) => selectPackItemsStats(state), shallowEqual);

  return (
    <Stack className="pack">
      <SectionHeader variant="large-margin">
        <Column>
          <SectionHeader.Title>Pack</SectionHeader.Title>
          <Stats className="pack__stats" stats={stats} />
        </Column>
      </SectionHeader>
      <Stack.List isEmpty={items.length === 0}>
        {items.length > 0
          ? items.map((item: Item) => <PackItem key={item.id} {...item} />)
          : `No ${stats.allItemUniqueCount > 0 ? 'matching ' : ''}items in pack`}
      </Stack.List>
    </Stack>
  );
};
