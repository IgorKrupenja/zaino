import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';
import './style.scss';

type ModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  children: ReactNode;
};

/**
 * Modal component with custom styling.
 */
export const Modal = ({ children, ...rest }: ModalProps) => {
  ReactModal.setAppElement('#app');

  return (
    <ReactModal className="modal__container" overlayClassName="modal__overlay" {...rest}>
      {/* extra div is needed to achieve proper scrolling when viewport height < modal height */}
      <section className="modal">{children}</section>
    </ReactModal>
  );
};
