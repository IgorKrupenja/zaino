import React, { ReactNode } from 'react';
import './style.scss';

export const PopoverContent = ({ children }: { children: ReactNode }) => {
  return <div className="popover-content">{children}</div>;
};
