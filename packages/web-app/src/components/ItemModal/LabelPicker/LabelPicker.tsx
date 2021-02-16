import React from 'react';
import { Button } from '../../Common/Controls/Button';
import { EditIcon } from '../../Common/Icons/EditIcon';
import { LabelBadgeList } from '../../Common/LabelBadge/LabelBadgeList';
import { LabelSelect } from '../../Common/Selects/LabelSelect';
import { Column } from '../../Common/Wrappers/Column';
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
