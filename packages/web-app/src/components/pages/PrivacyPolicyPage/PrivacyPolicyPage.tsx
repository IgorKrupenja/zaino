import './PrivacyPolicyPage.scss';

import { useTitle } from '../../../hooks';
import { BackLink } from '../../common/misc/BackLink';
import PrivacyPolicyContent from './PrivacyPolicyContent';

export const PrivacyPolicyPage = () => {
  useTitle('Privacy and cookie policy | Zaino');

  // const PrivacyPolicyContent = lazy(async () => {
  //   try {
  //     // @ts-ignore
  //     return await import('./PrivacyPolicyContent');
  //   } catch {
  //     console.warn(
  //       [
  //         'Privacy policy content not found. Please create a file named "PrivacyPolicyContent.tsx"',
  //         ' in the "src/components/pages/PrivacyPolicy" directory.',
  //       ].join()
  //     );
  //     return {
  //       default: () => <>Privacy policy placeholder.</>,
  //     };
  //   }
  // });

  return (
    <main className="privacy-policy">
      <p className="privacy-policy__title">Zaino</p>
      <BackLink />
      <PrivacyPolicyContent />
      <BackLink className="privacy-policy__bottom-link" />
    </main>
  );
};
