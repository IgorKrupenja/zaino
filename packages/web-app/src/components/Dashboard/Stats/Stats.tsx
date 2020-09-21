/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React from 'react';
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
    // dot separator
    (weight > 0 ? ' • ' : '') +
    // kilograms if applicable
    (kilos > 0 ? `${kilos}kg ` : '') +
    // grams if applicable
    (grams > 0 ? `${grams}g` : '') +
    // only show percentage if some of the items are filtered out
    // and percentage is not 0 to account for 0-weight items
    (allItemUniqueCount > filteredItemUniqueCount && percentageOfTotal > 0
      ? `, ${percentageOfTotal}% of total`
      : '');

  if (allItemUniqueCount === 0) {
    return null;
  } else if (filteredItemUniqueCount === 0) {
    return <div className="stats">0 items</div>;
  } else {
    return (
      <div className="stats">
        {countString}
        {weightString}
      </div>
    );
  }
};
