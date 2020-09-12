import React from 'react';
import PopoverDefault, { ContentRenderer } from 'react-tiny-popover';

type PopoverProps = {
  isOpen: boolean;
  onClickOutside?: ((e: MouseEvent) => void) | undefined;
  content: JSX.Element | ContentRenderer;
  children: JSX.Element | ((ref: React.Ref<any>) => JSX.Element);
};

export const Popover = ({ isOpen, onClickOutside, content, children }: PopoverProps) => {
  return (
    <PopoverDefault
      isOpen={isOpen}
      // containerStyle={defaultContainerStyle}
      containerClassName="popover__container"
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
