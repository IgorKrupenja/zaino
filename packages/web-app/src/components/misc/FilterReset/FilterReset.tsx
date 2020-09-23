import React, { ReactNode } from 'react';
import './style.scss';

type FilterResetProps = {
  onClick: () => void;
  children: ReactNode;
};

export const FilterReset = ({ onClick, children }: FilterResetProps) => {
  return <div onClick={onClick}>{children}</div>;
};
