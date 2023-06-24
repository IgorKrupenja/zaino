import './Modal.scss';

import { ReactNode } from 'react';
import ReactModal from 'react-modal';

type ModalProps = {
  children: ReactNode;
  contentLabel: string;
  isOpen: boolean;
  onRequestClose: () => void;
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
