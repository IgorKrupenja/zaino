import React from 'react';
import CloseIcon from '../../../images/icons/close.svg';
import './style.scss';

type CloseButtonProps = {
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  className?: string;
};

export const CloseButton = ({ onClick, className }: CloseButtonProps) => {
  return (
    <button
      className={`close-button${className ? ` ${className}` : ''}`}
      type="button"
      onClick={onClick}
    >
      <CloseIcon className="close-button__icon" />
    </button>
  );
};
