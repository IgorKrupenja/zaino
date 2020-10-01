import React from 'react';
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

export const Popover = ({ isOpen, children, containerClassName, ...rest }: PopoverProps) => {
  return (
    <ReactTinyPopover
      isOpen={isOpen}
      containerClassName={`popover-container${getClassString(containerClassName)}`}
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
