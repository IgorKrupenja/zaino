import React, { ReactNode } from 'react';
import './style.scss';

type ListProps = {
  title: string;
  // todo perhaps rename is empty and move part of the logic to inv/pack
  filteredItemCount: number;
  allItemCount: number;
  children?: ReactNode;
};

export const List = ({ filteredItemCount, allItemCount, title, children }: ListProps) => {
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
