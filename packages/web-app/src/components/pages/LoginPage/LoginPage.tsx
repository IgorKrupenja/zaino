import './LoginPage.scss';

import { getAuth, signInWithRedirect } from 'firebase/auth';
import GoogleButton from 'react-google-button';
import { Link } from 'react-router-dom';

import { googleAuthProvider } from '../../../firebase';
import { useTitle } from '../../../hooks';
import { ReactComponent as GithubIcon } from '../../../images/icons/github.svg';

export const LoginPage = () => {
  useTitle('Zaino');

  return (
    <main className="login-page">
      <h2 className="login-page__title">Zaino</h2>
      <p className="login-page__slogan">
        Hiking and mountaineering equipment app for the meticulous adventurer.
      </p>
      <GoogleButton
        className="login-page__button"
        // TODO: Previously used signInWithRedirect but this broke prod recently, see #666
        onClick={() => signInWithRedirect(getAuth(), googleAuthProvider)}
        type="light"
      />
      <Link className="login-page__policies" to="/privacy">
        Privacy and cookie policy
      </Link>
      <a className="login-page__github-link" href="https://www.github.com/igor-krupenja/zaino">
        <span className="login-page__github-link__text">Source on Github</span>
        <GithubIcon className="login-page__github-link__icon" />
      </a>
    </main>
  );
};
