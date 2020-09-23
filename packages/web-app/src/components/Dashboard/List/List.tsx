import React, { ReactNode } from 'react';
import './style.scss';

type ListProps = {
  title: string;
  // todo perhaps rename is empty and move part of the logic to inv/pack
  // todo likely just pass an empty list component from there
  // todo or not
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

  const isFirefoxMac =
    navigator.userAgent.indexOf('Firefox') !== -1 && navigator.platform.indexOf('Mac') !== -1;

  return (
    <div className={`list${isFirefoxMac ? ' list--firefox-mac' : ''}`}>
      {/* todo need ternary here */}
      {emptyString}
      {children}
    </div>
  );
};
