import { ReactNode } from 'react';
import { ContentRenderer, Popover as ReactTinyPopover, PopoverAlign } from 'react-tiny-popover';
import { getClassString } from '../../../../utils';
import './style.scss';

type PopoverProps = {
  isOpen: boolean;
  onClickOutside?: ((e: MouseEvent) => void) | undefined;
  content: JSX.Element | ContentRenderer;
  children: JSX.Element;
  className?: string;
  align?: PopoverAlign;
};

/**
 * Compound popover component used throughout the UI.
 * Used with specific sub-components, see below.
 */
export const Popover = ({ isOpen, children, className, ...rest }: PopoverProps) => {
  return (
    <ReactTinyPopover
      isOpen={isOpen}
      containerClassName={getClassString('popover', { extraClassNames: className })}
      align="center"
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
