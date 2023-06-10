import './CloseButton.scss';

import { ReactComponent as CloseIcon } from '../../../../images/icons/close.svg';
import { getClassString } from '../../../../utils';

type CloseButtonProps = {
  className?: string;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  size?: 'small' | 'large';
};

export const CloseButton = ({ onClick, className, size = 'small' }: CloseButtonProps) => {
  return (
    <button
      className={getClassString('close-button', { extraClassNames: className, variant: size })}
      onClick={onClick}
      type="button"
    >
      <CloseIcon className="close-button__icon" />
    </button>
  );
};
