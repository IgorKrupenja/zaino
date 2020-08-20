import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Header from '../components/common/Header';
import LabelFilters from '../components/Labels/LabelFilters';
import selectFilteredLabels from '../state/selectors/labels';
import { RootState } from '../state/store';

const LabelsPage = () => {
  const labels = useSelector((state: RootState) => selectFilteredLabels(state), shallowEqual);

  // console.log(labels);

  return (
    <>
      <Header />
      <main>
        <LabelFilters />
        <div>
          {labels.map(label => (
            <p key={label.id}>
              {label.name}: {label.itemCount}
            </p>
          ))}
        </div>
      </main>
    </>
  );
};

export default LabelsPage;
