import React, { ReactNode } from 'react';
import './style.scss';

type PopoverHeadingProps = {
  text: string;
  children?: ReactNode;
};

export const PopoverHeading = ({ text, children }: PopoverHeadingProps) => {
  return (
    <div className="popover-heading">
      <h3 className="popover-heading__text">{text}</h3>
      {children}
    </div>
  );
};
