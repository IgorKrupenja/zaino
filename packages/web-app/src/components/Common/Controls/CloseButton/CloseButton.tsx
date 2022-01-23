import React from 'react';
import { ReactComponent as CloseIcon } from '../../../../images/icons/close.svg';
import { getClassString } from '../../../../utils/getClassString';
import './style.scss';

type CloseButtonProps = {
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  className?: string;
};

export const CloseButton = ({ onClick, className }: CloseButtonProps) => {
  return (
    <button className={getClassString('close-button', className)} type="button" onClick={onClick}>
      <CloseIcon />
    </button>
  );
};
