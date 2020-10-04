import React, { ReactNode } from 'react';
import ReactTinyPopover, { Align, ContentRenderer } from 'react-tiny-popover';
import { getClassString } from '../../../utils/getClassString';
import './style.scss';

type PopoverProps = {
  isOpen: boolean;
  onClickOutside?: ((e: MouseEvent) => void) | undefined;
  content: JSX.Element | ContentRenderer;
  children: JSX.Element | ((ref: React.Ref<any>) => JSX.Element);
  containerClassName?: string;
  align?: Align;
};

/**
 * Compound popover component used throughout the UI.
 * Used with specific sub-components, see below.
 */
export const Popover = ({ isOpen, children, containerClassName, ...rest }: PopoverProps) => {
  return (
    <ReactTinyPopover
      isOpen={isOpen}
      containerClassName={`popover${getClassString(containerClassName)}`}
      // in seconds
      transitionDuration={0.15}
      align="center"
      position={['bottom', 'right']}
      {...rest}
    >
      {children}
    </ReactTinyPopover>
  );
};

type PopoverChildProps = {
  children: ReactNode;
};

const Content = ({ children }: PopoverChildProps) => {
  return <div className="popover__content">{children}</div>;
};

const Header = ({ children }: PopoverChildProps) => {
  return <div className="popover__header">{children}</div>;
};

const Title = ({ children }: PopoverChildProps) => {
  return <h3 className="popover__title">{children}</h3>;
};

Popover.Content = Content;
Popover.Header = Header;
Popover.Title = Title;
