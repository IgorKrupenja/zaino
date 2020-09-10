import React from 'react';
import CloseIcon from '../../../images/ui/close.svg';
import './style.scss';

type CloseButtonProps = {
  onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
};

export const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <button className="close-button" type="button" onClick={onClick}>
      <CloseIcon className="close-button__icon" />
    </button>
  );
};
