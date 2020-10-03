import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { LabelFilters } from '../../Labels/LabelFilters';
import { Labels } from '../../Labels/Labels';
import { Loader } from '../../Misc/Loader';
import './style.scss';

export const LabelsPage = () => {
  const isLoading = useSelector((state: RootState) => state.dataLoader.isLoading);

  document.title = 'Labels | Zaino';

  return (
    <main className="labels-page">
      <LabelFilters />
      {isLoading ? <Loader /> : <Labels />}
    </main>
  );
};
