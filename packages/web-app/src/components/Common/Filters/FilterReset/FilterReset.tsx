import React, { ReactNode } from 'react';
import { ReactComponent as CloseIcon } from '../../../../images/icons/close.svg';
import { Button } from '../../Controls/Button';
import './style.scss';

type FilterResetProps = {
  onClick?: () => void;
  children: ReactNode;
  isFiltering: boolean;
};

export const FilterReset = ({ onClick, children, isFiltering }: FilterResetProps) => {
  return (
    <Button
      className={`filter-reset button--white${isFiltering ? '' : ' filter-reset--hidden'}`}
      onClick={onClick}
    >
      <CloseIcon className="button--white__icon filter-reset__icon" />
      {children}
    </Button>
  );
};
