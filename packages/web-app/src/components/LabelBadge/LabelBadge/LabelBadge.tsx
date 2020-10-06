import { Label } from '@zaino/shared';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ColorName, Colors } from '../../../constants/Colors';
import { setItemLabelsFilter } from '../../../state/slices/itemsFilters';
import { getClassString } from '../../../utils/getClassString';
import './style.scss';

type LabelBadgeProps = {
  label?: Label;
  className?: string;
  colorName?: ColorName;
  onClick?: () => void;
  children?: string;
  disabled?: boolean;
};

/**
 * Component that shows fancy label badges.
 * Used both inside LabelBadgeList and on their own on Labels page.
 */
export const LabelBadge = ({
  label,
  colorName,
  onClick,
  children,
  disabled,
  className,
}: LabelBadgeProps) => {
  const dispatch = useDispatch();

  return (
    <button
      className={`label-badge${getClassString(className)}`}
      disabled={disabled}
      style={{
        backgroundColor: Colors.find(
          labelColor => labelColor.name === (colorName ?? label?.colorName)
        )?.hexValue,
      }}
      onClick={() => {
        if (!disabled && label) {
          // execute extra actions if onClick was passed
          onClick && onClick();
          dispatch(setItemLabelsFilter([label.id]));
        }
      }}
    >
      {children ? children : label?.name}
    </button>
  );
};
