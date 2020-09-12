import React, { ReactNode } from 'react';
import './style.scss';

type PopoverHeaderProps = {
  text: string;
  children?: ReactNode;
};

export const PopoverHeader = ({ text, children }: PopoverHeaderProps) => {
  return (
    <div className="popover-header">
      <h3 className="popover-header__text">{text}</h3>
      {children}
    </div>
  );
};
