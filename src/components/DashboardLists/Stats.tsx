import React from 'react';

type Stats = {
  weight: number;
  percentageOfTotal: number;
  filteredItemCount: number;
  totalItemCount: number;
};

const Stats = ({ filteredItemCount, weight, percentageOfTotal, totalItemCount }: Stats) => {
  if (totalItemCount === 0 || filteredItemCount === 0) {
    return null;
  } else if (totalItemCount === filteredItemCount) {
    return (
      <p>
        {filteredItemCount} {filteredItemCount > 1 ? 'items with total' : 'item with'} weight{' '}
        {weight}g
      </p>
    );
  } else {
    return (
      <p>
        {filteredItemCount} {filteredItemCount > 1 ? 'items with combined' : 'item with'} weight{' '}
        {weight}g, {percentageOfTotal}% of total
      </p>
    );
  }
};

export default Stats;
