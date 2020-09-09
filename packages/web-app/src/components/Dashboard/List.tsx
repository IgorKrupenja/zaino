import React, { ReactNode } from 'react';

type ListProps = {
  title: string;
  filteredItemCount: number;
  allItemCount: number;
  children?: ReactNode;
};

const List = ({ filteredItemCount, allItemCount, title, children }: ListProps) => {
  let emptyString = '';

  if (allItemCount === 0) {
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
