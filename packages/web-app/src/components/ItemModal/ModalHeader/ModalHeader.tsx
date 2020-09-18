import React, { ReactNode } from 'react';
import './style.scss';

type ModalTitleProps = {
  // title: string;
  children: ReactNode;
};

export const ModalHeader = ({ children }: ModalTitleProps) => {
  return <header className="modal-header">{children}</header>;
};
