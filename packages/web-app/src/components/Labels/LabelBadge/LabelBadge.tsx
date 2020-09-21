import { Colors, Label } from '@zaino/shared';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setItemLabelsFilter } from '../../../state/slices/itemsFilters';
import './style.scss';

type LabelBadgeProps = {
  label: Label;
};

export const LabelBadge = ({ label }: LabelBadgeProps) => {
  const dispatch = useDispatch();

  return (
    <li
      className="label-badge"
      style={{
        backgroundColor: Colors.find(labelColor => labelColor.name === label.colorName)?.hexValue,
      }}
      onClick={() => dispatch(setItemLabelsFilter([label.id]))}
    >
      {label.name}
    </li>
  );
};
