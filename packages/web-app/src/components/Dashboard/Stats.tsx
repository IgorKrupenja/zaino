import React from 'react';

type Stats = {
  weight: number;
  percentageOfTotal: number;
  allItemUniqueCount: number;
  filteredItemTotalCount: number;
  filteredItemUniqueCount: number;
};

const Stats = ({
  weight,
  percentageOfTotal,
  allItemUniqueCount,
  filteredItemTotalCount,
  filteredItemUniqueCount,
}: Stats) => {
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

export default Stats;
