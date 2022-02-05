import { User } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import GoogleButton from 'react-google-button';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firebase } from '../../../firebase/firebase';
import { useTitle } from '../../../hooks/useTitle';
import { ReactComponent as GithubIcon } from '../../../images/icons/github.svg';
import { login, login_TEMP_MOVE_TO_SERVICE } from '../../../state/slices/userSlice';
import { Loader } from '../../Common/Misc/Loader';
import './style.scss';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const [isFirstUpdate, setIsFirstUpdate] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useTitle('Zaino');

  const firstUpdate = useRef(true);

  useEffect(() => {
    console.log('LoginPage.useEffect');

    const handleLogin = async (user: User) => {
      const credential = await firebase.auth().getRedirectResult();
      // Using store.dispatch as useDispatch cannot be used outside of functional components
      dispatch(login({ user, isNew: credential.additionalUserInfo?.isNewUser }));
    };

    // const handleLogin = async (user: firebase.User) => {
    //   const credential = await firebase.auth().getRedirectResult();
    //   // Using store.dispatch as useDispatch cannot be used outside of functional components
    //   dispatch(login({ user, isNew: credential.additionalUserInfo?.isNewUser }));
    // };
    // if (isFirstUpdate) {
    //   console.log('first update');
    //   setIsFirstUpdate(false);
    //   return;
    // }

    if (firstUpdate.current) {
      console.log('first update');
      firstUpdate.current = false;
      return;
    }

    if (loading) {
      console.log('loading');
      setIsPageLoading(true);

      // maybe trigger a loading screen
      return;
    }
    if (user) {
      void handleLogin(user);
      console.log('got user', user);
      navigate('/dashboard');
      setIsPageLoading(false);
    }
    // todo review
  }, [dispatch, loading, navigate, user]);

  return loading ? (
    <Loader />
  ) : (
    <main className="login-page">
      <h2 className="login-page__title">Zaino</h2>
      <p className="login-page__slogan">
        Hiking and mountaineering equipment app for the meticulous adventurer.
      </p>
      <GoogleButton
        // fix width, cannot set in SCSS as component overwrites class styles with inline styles
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
