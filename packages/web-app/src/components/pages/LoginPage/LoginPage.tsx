import { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { firebase } from '../../../firebase/firebase';
import { useTitle } from '../../../hooks/useTitle';
import { ReactComponent as GithubIcon } from '../../../images/icons/github.svg';
import { loadUserData } from '../../../state/slices/demoDataSlice';
import { login, login_TEMP_MOVE_TO_SERVICE } from '../../../state/slices/userSlice';
import { asciiLogo } from '../../../utils';
import { Loader } from '../../Common/Misc/Loader';
import './style.scss';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useTitle('Zaino');

  useEffect(() => {
    setIsLoading(true);

    if (firebase) {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          setIsLoading(true);

          // User is signed in
          const credential = await firebase.auth().getRedirectResult();
          dispatch(login({ user, isNew: credential.additionalUserInfo?.isNewUser }));
          // todo this should go to dashboard maybe?
          dispatch(loadUserData(user.uid));
          navigate('/dashboard');

          // todo this defs to dashboard? or maybe in component
          console.log(asciiLogo);
        } else {
          setIsLoading(false);
        }
      });
    }
  }, [dispatch, navigate]);

  return isLoading ? (
    <Loader />
  ) : (
    <main className="login-page">
      <h2 className="login-page__title">Zaino</h2>
      <p className="login-page__slogan">
        Hiking and mountaineering equipment app for the meticulous adventurer.
      </p>
      <GoogleButton
        // Fix width, cannot set in SCSS as component overwrites class styles with inline styles
        style={{ width: '20rem', textAlign: 'start' }}
        type="light"
        onClick={() => dispatch(login_TEMP_MOVE_TO_SERVICE())}
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
