import './FilterReset.scss';

import { ReactNode } from 'react';

import { ReactComponent as CloseIcon } from '../../../../images/icons/close.svg';
import { Button } from '../../controls/Button';

type FilterResetProps = {
  children: ReactNode;
  isFiltering: boolean;
  onClick?: () => void;
};

export const FilterReset = ({ onClick, children, isFiltering }: FilterResetProps) => {
  return (
    <Button
      className={`filter-reset ${isFiltering ? '' : ' filter-reset--hidden'}`}
      onClick={onClick}
      variant="transparent"
    >
      <CloseIcon className="filter-reset__icon filter-reset__icon" />
      {children}
    </Button>
  );
};
