import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../state/store';
import { getClassString } from '../../../utils/getClassString';
import './style.scss';

type BackLinkProps = {
  to: string | undefined;
  className?: string;
};

/**
 * Link used to go back from a technical page.
 * Currently used only with privacy and cookie policies.
 */
export const BackLink = ({ to, className }: BackLinkProps) => {
  const isAuthenticated = useSelector((state: RootState) => !!state.user.uid);

  return (
    // if "to" is defined, go back to that location;
    // if "to" is not defined (e.g. some edge cases like manually direct linking to a page
    // or copy-pasting the page link into a new tab/window),
    // go to dashboard or login page depending on auth
    <Link
      to={to ?? (isAuthenticated ? '/dashboard' : '/')}
      className={getClassString('back-link', className)}
    >
      ← Back to {isAuthenticated ? 'app' : 'login page'}
    </Link>
  );
};
