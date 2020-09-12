import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useToggle from '../../hooks/useToggle';
import selectFilteredLabels, { selectLabelCount } from '../../state/selectors/labels';
import { addLabel, saveSortOrder } from '../../state/slices/labels';
import { RootState } from '../../state/store';
import LabelFilters from '../Labels/Filters';
import LabelDetails from '../Labels/LabelDetails';
import LabelForm from '../Labels/LabelForm';
import { Loader } from '../misc/Loader';

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
    <>
      <LabelFilters />
      {isLoading ? (
        <Loader />
      ) : (
        <main className="labels-page">
          <section>
            {/* heading */}
            <h2>{isFiltering ? labelCount : `${labelCount} matching`} labels</h2>
            {/* add label */}
            <button onClick={toggleForm}>Add label</button>
            {isFormOpen && (
              <LabelForm
                // lastSortIndex to keep newly-created label at the top of the list
                // if sorting by name
                onSubmit={label => dispatch(addLabel({ ...label, lastSortIndex: 0 }))}
                toggleForm={toggleForm}
              />
            )}
            {/* label list */}
            {labels.length > 0
              ? labels.map(label => <LabelDetails key={label.id} {...label} />)
              : `No ${isFiltering ? '' : 'matching'} labels`}
          </section>
        </main>
      )}
    </>
  );
};

export default LabelsPage;
