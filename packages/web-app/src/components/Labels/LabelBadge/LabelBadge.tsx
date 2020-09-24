import { Label } from '@zaino/shared';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Colors } from '../../../constants/Colors';
import { setItemLabelsFilter } from '../../../state/slices/itemsFilters';
import './style.scss';

type LabelBadgeProps = {
  label: Label;
  onClick?: () => void;
};

export const LabelBadge = ({ label, onClick }: LabelBadgeProps) => {
  const dispatch = useDispatch();

  return (
    <li
      className="label-badge"
      style={{
        backgroundColor: Colors.find(labelColor => labelColor.name === label.colorName)?.hexValue,
      }}
      onClick={() => {
        onClick && onClick();
        dispatch(setItemLabelsFilter([label.id]));
      }}
    >
      {label.name}
    </li>
  );
};
