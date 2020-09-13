import React from 'react';
import PopoverDefault, { ContentRenderer } from 'react-tiny-popover';
import './style.scss';

type PopoverProps = {
  isOpen: boolean;
  onClickOutside?: ((e: MouseEvent) => void) | undefined;
  content: JSX.Element | ContentRenderer;
  children: JSX.Element | ((ref: React.Ref<any>) => JSX.Element);
  containerClassName?: string;
};

export const Popover = ({
  isOpen,
  onClickOutside,
  content,
  children,
  containerClassName,
}: PopoverProps) => {
  return (
    <PopoverDefault
      isOpen={isOpen}
      containerClassName={`popover-container ${containerClassName ? containerClassName : ''}`}
      // in seconds
      transitionDuration={0.15}
      position={['bottom', 'right']}
      onClickOutside={onClickOutside}
      content={content}
    >
      {children}
    </PopoverDefault>
  );
};
