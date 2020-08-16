import React from 'react';

type Stats = {
  weight: number;
  percentageOfTotal: number;
  filteredItemCount: number;
  totalItemCount: number;
};

const Stats = ({ filteredItemCount, weight, percentageOfTotal, totalItemCount }: Stats) => {
  // todo likely refactor when doing styles
  if (totalItemCount === 0 || filteredItemCount === 0) {
    return null;
  } else if (totalItemCount === filteredItemCount) {
    return (
      <div className="stats">
        {filteredItemCount} {filteredItemCount > 1 ? 'items with total' : 'item with'} weight{' '}
        {weight}g
      </div>
    );
  } else {
    return (
      <div className="stats">
        {filteredItemCount} {filteredItemCount > 1 ? 'items with combined' : 'item with'} weight{' '}
        {weight}g, {percentageOfTotal}% of total
      </div>
    );
  }
};

export default Stats;
