import { Label } from '@zaino/shared';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../state/store';
import { getClassString } from '../../../../utils/getClassString';
import { LabelBadge } from '../LabelBadge';
import './style.scss';

type LabelBadgeListProps = {
  labelIds: string[] | undefined;
  className?: string;
  onBadgeClick?: () => void;
  badgeClickDisabled?: boolean;
};

export const LabelBadgeList = ({
  badgeClickDisabled,
  labelIds,
  className,
  onBadgeClick,
}: LabelBadgeListProps) => {
  const labels = useSelector((state: RootState) => state.labels);
  const itemLabels = labelIds?.map(
    (labelId) => labels.find((label) => label.id === labelId) as Label
  );

  return itemLabels && itemLabels?.length > 0 ? (
    <div className={getClassString('label-badge-list', className)}>
      {itemLabels.map((label) => (
        <LabelBadge
          onClick={onBadgeClick}
          key={label.id}
          label={label}
          disabled={badgeClickDisabled}
        />
      ))}
    </div>
  ) : null;
};
