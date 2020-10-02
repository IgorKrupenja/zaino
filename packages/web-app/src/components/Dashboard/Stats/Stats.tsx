/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React from 'react';
import { BulletWrapper } from '../../Wrappers/BulletWrapper';
import './style.scss';

type StatsProps = {
  stats: {
    weight: number;
    percentageOfTotal: number;
    allItemUniqueCount: number;
    filteredItemTotalCount: number;
    filteredItemUniqueCount: number;
  };
};

export const Stats = ({ stats }: StatsProps) => {
  const {
    weight,
    percentageOfTotal,
    allItemUniqueCount,
    filteredItemTotalCount,
    filteredItemUniqueCount,
  } = stats;

  const countString =
    // total count
    filteredItemTotalCount +
    // word "item" or "itemS" depending on count
    ` item${filteredItemTotalCount > 1 ? 's' : ''}` +
    // unique count
    ` (${filteredItemUniqueCount} unique)`;

  const kilos = Math.floor(weight / 1000);
  const grams = weight % 1000;
  const weightString =
    weight > 0
      ? (kilos > 0 ? `${kilos}kg ` : '') + // kilograms if applicable
        (grams > 0 ? `${grams}g` : '') + // grams if applicable
        // only show percentage if some of the items are filtered out
        // and percentage is not 0 to account for 0-weight items
        (allItemUniqueCount > filteredItemUniqueCount && percentageOfTotal > 0
          ? `, ${percentageOfTotal}% of total`
          : '')
      : '0g'; // also show 0g if total weight is 0 (i.e. there are only 0-weight items in list)

  return (
    <BulletWrapper className="stats">
      {allItemUniqueCount === 0 || filteredItemUniqueCount === 0 ? (
        '0 items'
      ) : (
        <>
          <span>{countString}</span>
          <span>{weightString}</span>
        </>
      )}
    </BulletWrapper>
  );
  // }
};
