import React from 'react';
import './style.scss';

export const MobilePlaceholder = () => {
  return (
    <main>
      <img src={`${process.env.GCP_STORAGE_URL as string}/categories/knife.svg`} />
      <h1>No mobile version yet :(</h1>
      <p>
        Thank you for your interest in accessing Zaino on mobile! Unfortunately, the mobile version
        of the app is still a work in progress. Check{' '}
        <a href="https://github.com/krupenja/zaino/issues/174">this Github issue</a> for updates.
      </p>
    </main>
  );
};
