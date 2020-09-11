import React from 'react';
import PopoverDefault, { ContentRenderer } from 'react-tiny-popover';
import { defaultContainerStyle } from './style';

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
      // styling with containerClassName broken with this component
      containerStyle={defaultContainerStyle}
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
