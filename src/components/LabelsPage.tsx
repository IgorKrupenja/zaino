import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Header from './common/Header';

const LabelsPage = () => {
  const labels = useSelector((state: RootState) => state.labels);

  return (
    <>
      <Header />
      <main>
        Labels page!
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
