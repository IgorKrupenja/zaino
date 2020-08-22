import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useToggle from '../../hooks/useToggle';
import selectFilteredLabels, { selectLabelCount } from '../../state/selectors/labels';
import { addLabel, saveSortOrder } from '../../state/slices/labels';
import { RootState } from '../../state/store';
import Header from '../common/Header';
import LabelEntry from '../Labels/LabelEntry';
import LabelFilters from '../Labels/LabelFilters';
import LabelForm from '../Labels/LabelForm';

const LabelsPage = () => {
  const dispatch = useDispatch();
  const labels = useSelector((state: RootState) => selectFilteredLabels(state));
  const labelCount = labels.length;
  const totalLabelCount = useSelector((state: RootState) => selectLabelCount(state));
  const isFiltering = labelCount === totalLabelCount;
  const [isFormOpen, toggleForm] = useToggle();

  useEffect(() => {
    dispatch(saveSortOrder(labels));
  }, [labels, dispatch]);

  return (
    <>
      <Header />
      <main>
        <LabelFilters />
        <button onClick={toggleForm}>Add label</button>
        {isFormOpen && (
          <LabelForm onSubmit={label => dispatch(addLabel(label))} toggleForm={toggleForm} />
        )}
        <div>
          <h2>{isFiltering ? labelCount : `${labelCount} matching`} labels</h2>
          {labels.length > 0
            ? labels.map(label => <LabelEntry key={label.id} {...label} />)
            : `No ${isFiltering ? '' : 'matching'} labels`}
        </div>
      </main>
    </>
  );
};

export default LabelsPage;
