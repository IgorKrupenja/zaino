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

  if (allItemUniqueCount === 0) {
    return null;
  } else if (filteredItemUniqueCount === 0) {
    return <div className="stats">0 items</div>;
  } else {
    return (
      <div className="stats">
        {filteredItemTotalCount} item{filteredItemTotalCount > 1 && 's'} ({filteredItemUniqueCount}{' '}
        unique), weight {weight}g: {percentageOfTotal}% of total
      </div>
    );
  }
};
