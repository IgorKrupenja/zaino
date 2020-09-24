import React from 'react';
import CloseIcon from '../../../images/icons/close.svg';
import { getClassString } from '../../../utils/getClassString';
import './style.scss';

type CloseButtonProps = {
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  className?: string;
};

export const CloseButton = ({ onClick, className }: CloseButtonProps) => {
  return (
    <button className={`close-button${getClassString(className)}`} type="button" onClick={onClick}>
      <CloseIcon className="close-button__icon" />
    </button>
  );
};
