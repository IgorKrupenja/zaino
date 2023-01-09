import './Modal.scss';

import { ReactNode } from 'react';
import ReactModal from 'react-modal';

type ModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  children: ReactNode;
};

export const Modal = ({ children, ...rest }: ModalProps) => {
  ReactModal.setAppElement('#root');

  return (
    // Extra container div is needed to achieve proper scrolling when viewport height < modal height
    <ReactModal className="modal__container" overlayClassName="modal__overlay" {...rest}>
      <section className="modal">{children}</section>
    </ReactModal>
  );
};
