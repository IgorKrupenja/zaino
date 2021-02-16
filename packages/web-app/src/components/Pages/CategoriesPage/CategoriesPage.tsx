import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { Header } from '../../Header/Header';
import './style.scss';

export const CategoriesPage = () => {
  const isLoading = useSelector((state: RootState) => state.dataLoader.isLoading);

  document.title = 'Categories | Zaino';

  return (
    <>
      <Header />
      <div>Categories</div>
    </>
  );
};
