import './Stats.scss';

import { BulletRow } from '../../common/containers/BulletRow';

type StatsProps = {
  className: string;
  stats: {
    allItemUniqueCount: number;
    filteredItemTotalCount: number;
    filteredItemUniqueCount: number;
    percentageOfTotal: number;
    weight: number;
  };
};

export const Stats = ({ stats, className }: StatsProps) => {
  const {
    weight,
    percentageOfTotal,
    allItemUniqueCount,
    filteredItemTotalCount,
    filteredItemUniqueCount,
  } = stats;

  const countString =
    filteredItemTotalCount.toString() +
    ` item${filteredItemTotalCount > 1 ? 's' : ''}` +
    ` (${filteredItemUniqueCount} unique)`;

  const kilos = Math.floor(weight / 1000);
  const grams = weight % 1000;
  const weightString =
    weight > 0
      ? (kilos > 0 ? `${kilos}kg ` : '') +
        (grams > 0 ? `${grams}g` : '') +
        // Only show percentage if some of the items are filtered out
        // and percentage is not 0 to account for 0-weight items.
        (allItemUniqueCount > filteredItemUniqueCount && percentageOfTotal > 0
          ? `, ${percentageOfTotal}% of total`
          : '')
      : '0g'; // Also show 0g if total weight is 0 (i.e. there are only 0-weight items in list)

  return (
    <BulletRow className={className}>
      {allItemUniqueCount === 0 || filteredItemUniqueCount === 0 ? (
        '0 items'
      ) : (
        <>
          <span>{countString}</span>
          <span>{weightString}</span>
        </>
      )}
    </BulletRow>
  );
};
