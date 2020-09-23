import { Label } from '@zaino/shared';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { LabelBadge } from '../LabelBadge';
import './style.scss';

type LabelBadgeListProps = {
  labelIds: string[] | undefined;
};

export const LabelBadgeList = ({ labelIds }: LabelBadgeListProps) => {
  const labels = useSelector((state: RootState) => state.labels);

  const itemLabels = labelIds?.map(labelId => labels.find(label => label.id === labelId) as Label);

  return itemLabels && itemLabels?.length > 0 ? (
    <ul className="label-list">
      {itemLabels.map(label => (
        <LabelBadge key={label.id} label={label} />
      ))}
    </ul>
  ) : null;
};
