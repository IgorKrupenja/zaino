import React from 'react';

type ListProps = {
  title: string;
  filteredItemCount: number;
  totalItemCount: number;
  children?: React.ReactNode;
};

const List = ({ filteredItemCount, totalItemCount, title, children }: ListProps) => {
  let emptyString = '';

  if (totalItemCount === 0) {
    emptyString = `No items in ${title}`;
  } else if (filteredItemCount === 0) {
    emptyString = `No matching items in ${title}`;
  }

  return (
    <div className={emptyString ? 'list list--empty' : 'list'}>
      {emptyString}
      {children}
    </div>
  );
};

export default List;
