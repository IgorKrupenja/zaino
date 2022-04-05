import { ReactNode } from 'react';
import { ContentRenderer, Popover as ReactTinyPopover, PopoverAlign } from 'react-tiny-popover';
import { getClassString } from '../../../../utils';
import './Popover.scss';

type PopoverProps = {
  align?: PopoverAlign;
  children: JSX.Element;
  className?: string;
  content: JSX.Element | ContentRenderer;
  isOpen: boolean;
  onClickOutside?: ((e: MouseEvent) => void) | undefined;
  size?: 'small' | 'large';
};

export const Popover = ({ children, className, isOpen, size, ...rest }: PopoverProps) => {
  return (
    <ReactTinyPopover
      align="center"
      containerClassName={getClassString('popover', { extraClassNames: className, variant: size })}
      isOpen={isOpen}
      positions={['bottom', 'right']}
      {...rest}
    >
      {children}
    </ReactTinyPopover>
  );
};

type PopoverChildProps = {
  children: ReactNode;
  className?: string;
};

const Header = ({ children }: PopoverChildProps) => {
  return <div className="popover__header">{children}</div>;
};

const Title = ({ children }: PopoverChildProps) => {
  return <h3 className="popover__title">{children}</h3>;
};

const Content = ({ children, className }: PopoverChildProps) => {
  return (
    <div className={getClassString('popover__content', { extraClassNames: className })}>
      {children}
    </div>
  );
};

const Text = ({ children }: PopoverChildProps) => {
  return <p className="popover__text">{children}</p>;
};

Popover.Header = Header;
Popover.Title = Title;
Popover.Content = Content;
Popover.Text = Text;
