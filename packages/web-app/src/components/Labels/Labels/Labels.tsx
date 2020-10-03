import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useToggle from '../../../hooks/useToggle';
import selectFilteredLabels, { selectLabelCount } from '../../../state/selectors/labels';
import { addLabel, saveSortOrder } from '../../../state/slices/labels';
import { RootState } from '../../../state/store';
import { Button } from '../../Controls/Button';
import { SectionHeader } from '../../Misc/SectionHeader';
import { ColumnWrapper } from '../../Wrappers/ColumnWrapper';
import { LabelDetails } from '../LabelDetails';
import { LabelForm } from '../LabelForm';
import { List } from '../List/List';
import './style.scss';

/**
 * Component that holds labels state and passes these as LabelDetails to List.
 */
export const Labels = () => {
  const dispatch = useDispatch();
  const labels = useSelector((state: RootState) => selectFilteredLabels(state));
  const labelCount = labels.length;
  const totalLabelCount = useSelector((state: RootState) => selectLabelCount(state));
  const [isFormOpen, toggleForm] = useToggle();

  useEffect(() => {
    dispatch(saveSortOrder(labels));
  }, [labels, dispatch]);

  return (
    <List>
      <SectionHeader className="section-header--large-margin">
        <ColumnWrapper>
          <SectionHeader.Title>Labels</SectionHeader.Title>
          <SectionHeader.Content>{labelCount} labels</SectionHeader.Content>
        </ColumnWrapper>
        {/* todo button should likely be off when form open */}
        <Button className="button--green labels__new-label" onClick={toggleForm}>
          New label
        </Button>
      </SectionHeader>
      {/* new label form */}
      {isFormOpen && (
        <LabelForm
          // lastSortIndex to keep newly-created label at the top of the list -- if sorting by name
          onSubmit={label => dispatch(addLabel({ ...label, lastSortIndex: 0 }))}
          toggleForm={toggleForm}
        >
          <Button submit className="button--green">
            Create new label
          </Button>
        </LabelForm>
      )}
      {/* list proper */}
      {labels.length > 0 ? (
        labels.map(label => <LabelDetails key={label.id} {...label} />)
      ) : (
        <List.Empty>{`No ${labelCount === totalLabelCount ? '' : 'matching'} labels`}</List.Empty>
      )}
    </List>
  );
};
