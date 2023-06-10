import './LabelBadge.scss';

import { ColorName, Label } from '@zaino/shared';
import { useDispatch } from 'react-redux';

import { colors } from '../../../../constants';
import { setItemLabelsFilter } from '../../../../state/slices/itemFiltersSlice';
import { getClassString } from '../../../../utils';

type LabelBadgeProps = {
  children?: string;
  className?: string;
  colorName?: ColorName;
  disabled?: boolean;
  label?: Label;
  onClick?: () => void;
};

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
