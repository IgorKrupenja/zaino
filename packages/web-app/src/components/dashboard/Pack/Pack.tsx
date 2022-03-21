import { Item } from '@zaino/shared';
import { shallowEqual, useSelector } from 'react-redux';
import { selectFilteredPackItems } from '../../../state/selectors/itemsSelector';
import { selectPackItemsStats } from '../../../state/selectors/itemsStatsSelector';
import { RootState } from '../../../state/store';
import { Column } from '../../common/containers/Column';
import { SectionHeader } from '../../common/Misc/SectionHeader';
import { PackItem } from '../PackItem';
import { Stack } from '../Stack';
import { Stats } from '../Stats';

/**
 * Component that holds pack items state and passes these as PackItems to Stack.
 */
export const Pack = () => {
  const items = useSelector((state: RootState) => selectFilteredPackItems(state), shallowEqual);
  const stats = useSelector((state: RootState) => selectPackItemsStats(state), shallowEqual);

  return (
    <Stack className="stack--right">
      <SectionHeader className="section-header--large-margin">
        <Column>
          <SectionHeader.Title>Pack</SectionHeader.Title>
          <Stats className="section-header__content" stats={stats} />
        </Column>
      </SectionHeader>
      {items.length > 0 ? (
        <Stack.List>
          {items.map((item: Item) => (
            <PackItem key={item.id} {...item} />
          ))}
        </Stack.List>
      ) : (
        <Stack.List isEmpty>
          No {stats.allItemUniqueCount > 0 && 'matching '}items in pack
        </Stack.List>
      )}
    </Stack>
  );
};
