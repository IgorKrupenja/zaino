import React from 'react';
import CategoryImage from '../CategoryImage';
import './style.scss';

export const MobilePlaceholder = () => {
  return (
    <main>
      <CategoryImage categoryName="Miscellaneous" />
      <h1>No mobile version yet :(</h1>
      <p>
        Thank you for your interest in accessing Zaino on mobile! Unfortunately, the mobile version
        of the app is still a work in progress. Check{' '}
        <a href="https://github.com/krupenja/zaino/issues/174">this Github issue</a> for updates.
      </p>
    </main>
  );
};
