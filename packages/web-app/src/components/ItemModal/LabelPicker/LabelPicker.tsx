import React from 'react';
import { closeModal } from '../../../utils/closeModal';
import { Button } from '../../Controls/Button';
import { EditIcon } from '../../Icons/EditIcon';
import { LabelBadgeList } from '../../LabelBadge/LabelBadgeList';
import { LabelSelect } from '../../Selects/LabelSelect';
import { ColumnWrapper } from '../../Wrappers/ColumnWrapper';
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
    <ColumnWrapper className="label-picker">
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
      <LabelBadgeList onBadgeClick={closeModal} labelIds={labelIds} />
    </ColumnWrapper>
  );
};
