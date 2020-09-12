import React from 'react';
import PopoverDefault, { ContentRenderer } from 'react-tiny-popover';
import { defaultContainerStyle } from './style';

type PopoverProps = {
  isOpen: boolean;
  onClickOutside?: ((e: MouseEvent) => void) | undefined;
  content: JSX.Element | ContentRenderer;
  children: JSX.Element | ((ref: React.Ref<any>) => JSX.Element);
  style?: Partial<CSSStyleDeclaration>;
};

export const Popover = ({ isOpen, onClickOutside, content, children, style }: PopoverProps) => {
  return (
    <PopoverDefault
      isOpen={isOpen}
      containerStyle={{ ...defaultContainerStyle, ...style }}
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
