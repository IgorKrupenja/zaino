import { Label } from '@zaino/shared';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTitle } from '../../../hooks/useTitle';
import useToggle from '../../../hooks/useToggle';
import selectFilteredLabels, { selectLabelCount } from '../../../state/selectors/labels';
import { saveSortOrder } from '../../../state/slices/labels';
import {
  resetLabelFilters,
  setLabelTextFilter,
  sortLabelsBy,
} from '../../../state/slices/labelsFilters';
import { RootState } from '../../../state/store';
import { Button } from '../../Common/Controls/Button';
import { CollectionFilters } from '../../Common/Filters/CollectionFilters';
import { Loader } from '../../Common/Misc/Loader';
import { ScrollablePage } from '../../Common/Misc/ScrollablePage';
import { SectionHeader } from '../../Common/Misc/SectionHeader';
import { Column } from '../../Common/Wrappers/Column';
import { LabelDetails } from '../LabelDetails';
import { List } from '../List';
import { NewLabel } from '../NewLabel';
import './style.scss';

export const LabelsPage = () => {
  useTitle('Labels | Zaino');
  const isLoading = useSelector((state: RootState) => state.dataLoader.isLoading);
  const dispatch = useDispatch();
  const labels = useSelector((state: RootState) => selectFilteredLabels(state)) as Label[];
  const labelCount = labels.length;
  const totalLabelCount = useSelector((state: RootState) => selectLabelCount(state));
  const [isFormOpen, toggleForm] = useToggle();

  useEffect(() => {
    dispatch(saveSortOrder(labels));
  }, [labels, dispatch]);

  return (
    <ScrollablePage>
      <CollectionFilters
        setTextFilter={setLabelTextFilter}
        sort={sortLabelsBy}
        resetFilters={resetLabelFilters}
        textFilterPlaceholder="Search labels"
      />
      {isLoading ? (
        <Loader />
      ) : (
        <List>
          {/* header with name, count and New label button */}
          <SectionHeader className="section-header--large-margin">
            <Column>
              <SectionHeader.Title>Labels</SectionHeader.Title>
              <SectionHeader.Content>
                {labelCount} label{labelCount !== 1 && 's'}
              </SectionHeader.Content>
            </Column>
            <Button
              className="button--green labels-page__new-label"
              disabled={isFormOpen}
              onClick={toggleForm}
            >
              New label
            </Button>
          </SectionHeader>
          {/* new label form */}
          {isFormOpen && <NewLabel toggleForm={toggleForm} />}
          {/* list proper */}
          {labelCount > 0 ? (
            labels.map((label) => <LabelDetails key={label.id} {...label} />)
          ) : (
            <List.Empty className={isFormOpen ? 'list--empty--border' : ''}>{`No${
              labelCount === totalLabelCount ? '' : ' matching'
            } labels`}</List.Empty>
          )}
        </List>
      )}
    </ScrollablePage>
  );
};
