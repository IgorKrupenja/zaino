import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { Header } from '../../Header/Header';
import { LabelFilters } from '../../Labels/LabelFilters';
import { Labels } from '../../Labels/Labels';
import { Loader } from '../../Misc/Loader';
import './style.scss';

export const LabelsPage = () => {
  const isLoading = useSelector((state: RootState) => state.dataLoader.isLoading);

  document.title = 'Labels | Zaino';

  return (
    <>
      <Header />
      {/* extra div for proper scrollbar position with header */}
      <div className="labels-page__container">
        {/* "--loading" needed for Loader to display correctly when loading demo data */}
        <main className={`labels-page ${isLoading && 'labels-page--loading'}`}>
          <LabelFilters />
          {isLoading ? <Loader /> : <Labels />}
        </main>
      </div>
    </>
  );
};
