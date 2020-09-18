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
export const Modal = ({ isOpen, onRequestClose, contentLabel, children }: ModalProps) => {
  ReactModal.setAppElement('#app');

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      className="modal__container"
      overlayClassName="modal__overlay"
    >
      {/* extra div is needed to achieve proper scrolling when viewport height < modal height */}
      <div className="modal">{children}</div>
    </ReactModal>
  );
};
