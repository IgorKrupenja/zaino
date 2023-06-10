import './MobilePlaceholder.scss';

export const MobilePlaceholder = () => {
  return (
    <main className="mobile-placeholder">
      <img
        alt="Pocket knife"
        className="mobile-placeholder__image"
        src={`${process.env.REACT_APP_GCP_STORAGE_URL as string}/categories/knife.svg`}
      />
      <h1 className="mobile-placeholder__header">No mobile version yet 😞</h1>
      <p className="mobile-placeholder__text">
        Thank you for your interest in using Zaino on mobile! Unfortunately, the mobile version of
        the app is still a work in progress. Check{' '}
        <a className="mobile-placeholder__link" href="https://github.com/krupenja/zaino/issues/174">
          this Github issue
        </a>{' '}
        for updates.
      </p>
    </main>
  );
};
