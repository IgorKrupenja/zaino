import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';

const LabelsPage = () => {
  // const dispatch = useDispatch()
  const labels = useSelector((state: RootState) => state.labels);

  return (
    <>
      Labels page!
      <div>
        {labels.map(label => (
          <p key={label.id}>
            {label.name}: {label.itemCount}
          </p>
        ))}
      </div>
    </>
  );
};

export default LabelsPage;
