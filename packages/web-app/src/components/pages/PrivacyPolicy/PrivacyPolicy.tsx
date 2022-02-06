import { lazy } from 'react';
import { useTitle } from '../../../hooks';
import { BackLink } from '../../Common/Misc/BackLink';
import './style.scss';

export const PrivacyPolicy = () => {
  useTitle('Privacy and cookie policy | Zaino');

  const PrivacyPolicyContent = lazy(async () => {
    try {
      return await import('./PrivacyPolicyContent');
    } catch {
      console.warn(
        [
          'Privacy policy content not found. Please create a file named "PrivacyPolicyContent.tsx"',
          ' in the "src/components/pages/PrivacyPolicy" directory.',
        ].join()
      );
      return {
        default: () => <>Privacy policy placeholder.</>,
      };
    }
  });

  return (
    <main className="privacy-policy">
      <p className="privacy-policy__title">Zaino</p>
      <BackLink />
      <PrivacyPolicyContent />
      <BackLink className="back-link--large-margin" />
    </main>
  );
};
