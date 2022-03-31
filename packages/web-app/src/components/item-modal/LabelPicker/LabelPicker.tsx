import { Column } from '../../common/containers/Column';
import { Button } from '../../common/controls/Button';
import { EditIcon } from '../../common/icons/EditIcon';
import { LabelBadgeList } from '../../common/misc/LabelBadgeList';
import { LabelSelect } from '../../common/selects/LabelSelect';
import './style.scss';

type LabelPickerProps = {
  labelIds: string[] | undefined;
  onChange: (labelIds: string[]) => void;
};

/**
 * Label picker with Select, LabelBadgeList etc.
 * Extracted into a separate component to make ItemForm more readable.
 * Can possibly used elsewhere in the future?
 */
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
        <Button className="button--small" variant="transparent">
          Labels
          <EditIcon />
        </Button>
      </LabelSelect>
      <LabelBadgeList labelIds={labelIds} badgeClickDisabled />
    </Column>
  );
};
