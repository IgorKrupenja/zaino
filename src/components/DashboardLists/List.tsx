import React from 'react';

type ListProps = {
  items: React.ReactChild[];
  title: string;
  filteredItemCount: number;
  totalItemCount: number;
  children?: React.ReactNode;
};

const List = ({ items, filteredItemCount, totalItemCount, title, children }: ListProps) => {
  if (totalItemCount === 0) {
    return (
      <>
        <p>No items in {title}</p>
        {children}
      </>
    );
  } else if (filteredItemCount === 0) {
    return <p>No matching items in {title}</p>;
  } else {
    return <div>{items}</div>;
  }
};

export default List;
