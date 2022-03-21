import { Column } from '../../common/containers/Column';
import { Button } from '../../common/Controls/Button';
import { EditIcon } from '../../common/Icons/EditIcon';
import { LabelBadgeList } from '../../common/labels/LabelBadgeList';
import { LabelSelect } from '../../common/Selects/LabelSelect';
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
      {/* Select */}
      <LabelSelect
        popoverAlign="center"
        labelIds={labelIds}
        headerText="Select labels"
        isCreatable
        onChange={onChange}
      >
        {/* Select toggle button */}
        <Button className="button--white button--small">
          Labels
          <EditIcon />
        </Button>
      </LabelSelect>
      {/* Label badge list */}
      <LabelBadgeList labelIds={labelIds} badgeClickDisabled />
    </Column>
  );
};
