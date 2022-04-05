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
        popoverAlign="center"
        labelIds={labelIds}
        headerText="Select labels"
        isCreatable
        onChange={onChange}
      >
        <Button variant="transparent" size="small">
          Labels
          <EditIcon />
        </Button>
      </LabelSelect>
      <LabelBadgeList labelIds={labelIds} badgeClickDisabled />
    </Column>
  );
};
