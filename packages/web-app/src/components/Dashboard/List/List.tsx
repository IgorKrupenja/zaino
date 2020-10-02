import React, { ReactNode } from 'react';
import './style.scss';

type ListProps = {
  title: string;
  filteredItemCount: number;
  allItemCount: number;
  children?: ReactNode;
};

export const List = ({ filteredItemCount, allItemCount, title, children }: ListProps) => {
  const isFirefoxMac =
    navigator.userAgent.indexOf('Firefox') !== -1 && navigator.platform.indexOf('Mac') !== -1;

  return (
    <div
      className={
        'list' +
        (isFirefoxMac ? ' list--firefox-mac' : '') +
        (allItemCount === 0 || filteredItemCount === 0 ? ' list--empty' : '')
      }
    >
      {allItemCount === 0 ? (
        <>No items in {title}</>
      ) : filteredItemCount === 0 ? (
        <>No matching items in {title}</>
      ) : (
        children
      )}
    </div>
  );
};
