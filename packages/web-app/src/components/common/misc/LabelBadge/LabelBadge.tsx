import './style.scss';

import { ColorName, Label } from '@zaino/shared';
import { useDispatch } from 'react-redux';

import { colors } from '../../../../constants';
import { setItemLabelsFilter } from '../../../../state/slices/itemFiltersSlice';
import { getClassString } from '../../../../utils';

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
      className={getClassString('label-badge', { extraClassNames: className })}
      disabled={disabled}
      onClick={() => {
        if (!disabled && label) {
          // execute extra actions if onClick was passed
          onClick && onClick();
          dispatch(setItemLabelsFilter([label.id]));
        }
      }}
      style={{
        backgroundColor: colors.find(
          (labelColor) => labelColor.name === (colorName ?? label?.colorName)
        )?.hexValue,
      }}
    >
      {children ? children : label?.name}
    </button>
  );
};
