import { Label } from '@zaino/shared';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTitle, useToggle } from '../../../hooks';
import { selectFilteredLabels, selectLabelCount } from '../../../state/selectors/labelsSelector';
import {
  resetLabelFilters,
  setLabelTextFilter,
  sortLabelsBy,
} from '../../../state/slices/labelFiltersSlice';
import { saveSortOrder } from '../../../state/slices/labelsSlice';
import { RootState } from '../../../state/store';
import { Column } from '../../common/containers/Column';
import { Button } from '../../common/controls/Button';
import { CollectionFilters } from '../../common/filters/CollectionFilters';
import { List } from '../../common/misc/List';
import { Loader } from '../../common/misc/Loader';
import { ScrollablePage } from '../../common/misc/ScrollablePage';
import { SectionHeader } from '../../common/misc/SectionHeader';
import { LabelDetails } from '../LabelDetails';
import { NewLabel } from '../NewLabel';
import './LabelsPage.scss';

export const LabelsPage = () => {
  useTitle('Labels | Zaino');

  const isLoading = useSelector((state: RootState) => state.demoData.isLoading);
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
          {/* Header with name, count and New label button */}
          <SectionHeader variant="large-margin">
            <Column>
              <SectionHeader.Title>Labels</SectionHeader.Title>
              <SectionHeader.Content>
                {labelCount} label{labelCount !== 1 && 's'}
              </SectionHeader.Content>
            </Column>
            {/* todo button variants */}
            <Button className="labels-page__new-label" disabled={isFormOpen} onClick={toggleForm}>
              New label
            </Button>
          </SectionHeader>
          {/* New label form */}
          {isFormOpen && <NewLabel toggleForm={toggleForm} />}
          {/* List proper */}
          {labelCount > 0 ? (
            labels.map((label) => <LabelDetails key={label.id} {...label} />)
          ) : (
            <List.Empty variant={isFormOpen ? 'top-border' : undefined}>{`No${
              labelCount === totalLabelCount ? '' : ' matching'
            } labels`}</List.Empty>
          )}
        </List>
      )}
    </ScrollablePage>
  );
};
