import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useToggle from '../../hooks/useToggle';
import selectFilteredLabels, { selectLabelCount } from '../../state/selectors/labels';
import { addLabel, saveSortOrder } from '../../state/slices/labels';
import { RootState } from '../../state/store';
import LabelDetails from '../Labels/LabelDetails';
import { LabelFilters } from '../Labels/LabelFilters/';
import LabelForm from '../Labels/LabelForm';
import { Loader } from '../Misc/Loader';

const LabelsPage = () => {
  const dispatch = useDispatch();
  const labels = useSelector((state: RootState) => selectFilteredLabels(state));
  const labelCount = labels.length;
  const totalLabelCount = useSelector((state: RootState) => selectLabelCount(state));
  const isFiltering = labelCount === totalLabelCount;
  const [isFormOpen, toggleForm] = useToggle();
  const isLoading = useSelector((state: RootState) => state.dataLoader.isLoading);

  document.title = 'Labels | Zaino';

  useEffect(() => {
    dispatch(saveSortOrder(labels));
  }, [labels, dispatch]);

  return (
    <main className="labels-page">
      <LabelFilters />
      {isLoading ? (
        <Loader />
      ) : (
        <section>
          {/* todo should whole thing be a modified Stack? */}
          {/* heading */}
          {/* todo likely use section header with .section-header--large-margin */}
          {/* todo maybe use StatsWrapper -- or call it something else? */}
          {/* todo likely remove isFiltering logic here */}
          <h2>{isFiltering ? labelCount : `${labelCount} matching`} labels</h2>
          {/* add label */}
          {/* todo this likely goes inside section header */}
          <button onClick={toggleForm}>New label</button>
          {/* todo pass button text as child so can have "create new label" */}
          {isFormOpen && (
            <LabelForm
              // lastSortIndex to keep newly-created label at the top of the list
              // if sorting by name
              onSubmit={label => dispatch(addLabel({ ...label, lastSortIndex: 0 }))}
              toggleForm={toggleForm}
            />
          )}
          {/* label list */}
          {/* todo but actually maybe separate List component and rename existing List to ItemList */}
          {labels.length > 0
            ? labels.map(label => <LabelDetails key={label.id} {...label} />)
            : // todo consider creating common component with empty dashboard list?
              `No ${isFiltering ? '' : 'matching'} labels`}
        </section>
      )}
    </main>
  );
};

export default LabelsPage;
