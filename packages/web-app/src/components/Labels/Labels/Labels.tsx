import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useToggle from '../../../hooks/useToggle';
import selectFilteredLabels, { selectLabelCount } from '../../../state/selectors/labels';
import { saveSortOrder } from '../../../state/slices/labels';
import { RootState } from '../../../state/store';
import { Button } from '../../Controls/Button';
import { SectionHeader } from '../../Misc/SectionHeader';
import { ColumnWrapper } from '../../Wrappers/ColumnWrapper';
import { LabelDetails } from '../LabelDetails';
import { List } from '../List/List';
import { NewLabel } from '../NewLabel';
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
          <SectionHeader.Content>
            {labelCount} label{labelCount !== 1 && 's'}
          </SectionHeader.Content>
        </ColumnWrapper>
        {/* todo button should likely be disabled when form open */}
        <Button className="button--green labels__new-label" onClick={toggleForm}>
          New label
        </Button>
      </SectionHeader>
      {/* new label form */}
      {isFormOpen && <NewLabel toggleForm={toggleForm} />}
      {/* list proper */}
      {labelCount > 0 ? (
        labels.map(label => <LabelDetails key={label.id} {...label} />)
      ) : (
        <List.Empty>{`No${labelCount === totalLabelCount ? '' : ' matching'} labels`}</List.Empty>
      )}
    </List>
  );
};
