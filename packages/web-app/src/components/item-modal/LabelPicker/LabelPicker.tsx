import { Column } from '../../common/containers/Column';
import { Button } from '../../common/controls/Button';
import { EditIcon } from '../../common/icons/EditIcon';
import { LabelBadgeList } from '../../common/misc/LabelBadgeList';
import { LabelSelect } from '../../common/selects/LabelSelect';
import './LabelPicker.scss';

type LabelPickerProps = {
  labelIds: string[] | undefined;
  onChange: (labelIds: string[]) => void;
};

export const LabelPicker = ({ labelIds, onChange }: LabelPickerProps) => {
  return (
    <Column className="label-picker">
      <LabelSelect
        headerText="Select labels"
        isCreatable
        labelIds={labelIds}
        onChange={onChange}
        popoverAlign="center"
      >
        <Button size="small" variant="transparent">
          Labels
          <EditIcon />
        </Button>
      </LabelSelect>
      <LabelBadgeList badgeClickDisabled labelIds={labelIds} />
    </Column>
  );
};
