import React from 'react';
import Popover from 'react-tiny-popover';
import useToggle from '../../hooks/useToggle';

type PopoverContainerProps = {
  heading: string;
  text: string;
  buttonAction: () => void;
};

const PopoverContainer = ({ heading, text, buttonAction }: PopoverContainerProps) => {
  const [isPopoverOpen, togglePopover] = useToggle();

  return (
    <Popover
      isOpen={isPopoverOpen}
      // preferred position
      position={['bottom', 'top']}
      onClickOutside={togglePopover}
      // in seconds
      transitionDuration={0.1}
      content={
        <>
          <h3>{heading}</h3>
          <button onClick={togglePopover}>X</button>
          <p>{text}</p>
          <button onClick={buttonAction}>Delete</button>
        </>
      }
    >
      <button onClick={togglePopover}>Delete</button>
    </Popover>
  );
};

export default PopoverContainer;
