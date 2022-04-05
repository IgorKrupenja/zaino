import { ReactNode } from 'react';
import { ReactComponent as CloseIcon } from '../../../../images/icons/close.svg';
import { Button } from '../../controls/Button';
import './style.scss';

type FilterResetProps = {
  onClick?: () => void;
  children: ReactNode;
  isFiltering: boolean;
};

export const FilterReset = ({ onClick, children, isFiltering }: FilterResetProps) => {
  return (
    <Button
      className={`filter-reset ${isFiltering ? '' : ' filter-reset--hidden'}`}
      onClick={onClick}
      variant="transparent"
    >
      <CloseIcon className="button--transparent__icon filter-reset__icon" />
      {children}
    </Button>
  );
};
