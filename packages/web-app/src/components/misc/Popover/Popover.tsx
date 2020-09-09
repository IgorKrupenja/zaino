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
      transitionDuration={0.15}
      position={['bottom']} // if you'd like, supply an array of preferred positions ordered by priority
      onClickOutside={onClickOutside} // handle click events outside of the popover/target here!
      content={content}
    >
      {children}
    </PopoverDefault>
  );
};
