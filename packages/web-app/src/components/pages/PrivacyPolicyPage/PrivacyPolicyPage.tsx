import './PrivacyPolicyPage.scss';

import { useTitle } from '../../../hooks';
import { BackLink } from '../../common/misc/BackLink';
import PrivacyPolicyContent from './PrivacyPolicyContent';

export const PrivacyPolicyPage = () => {
  useTitle('Privacy and cookie policy | Zaino');

  return (
    <main className="privacy-policy">
      <p className="privacy-policy__title">Zaino</p>
      <BackLink />
      <PrivacyPolicyContent />
      <BackLink className="privacy-policy__bottom-link" />
    </main>
  );
};
