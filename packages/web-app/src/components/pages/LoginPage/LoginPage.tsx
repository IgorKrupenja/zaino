import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import GoogleButton from 'react-google-button';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firebase } from '../../../firebase/firebase';
import { useTitle } from '../../../hooks/useTitle';
import { ReactComponent as GithubIcon } from '../../../images/icons/github.svg';
import { loadUserData } from '../../../state/slices/demoDataSlice';
import { login, login_TEMP_MOVE_TO_SERVICE } from '../../../state/slices/userSlice';
import { asciiLogo } from '../../../utils';
import { Loader } from '../../Common/Misc/Loader';
import './style.scss';

export const LoginPage = () => {
  const dispatch = useDispatch();
  // const [isFirstUpdate, setIsFirstUpdate] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useTitle('Zaino');

  // // Create a currentUser state
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  // useEffect(() => console.log(asciiLogo));

  useEffect(() => {
    // const handleLogin = async (user: User) => {
    //   const credential = await firebase.auth().getRedirectResult();
    //   // Using store.dispatch as useDispatch cannot be used outside of functional components
    //   dispatch(login({ user, isNew: credential.additionalUserInfo?.isNewUser }));
    // };
    console.log('LoginPage.useEffect');
    setIsPageLoading(true);

    if (firebase) {
      firebase.auth().onAuthStateChanged(async (user) => {
        console.log('LoginPage.useEffect.onAuthStateChanged');
        if (user) {
          setIsPageLoading(true);
          console.log('LoginPage.useEffect.onAuthStateChanged.authUser', user);

          // User is signed in
          const credential = await firebase.auth().getRedirectResult();
          dispatch(login({ user, isNew: credential.additionalUserInfo?.isNewUser }));
          // todo this should go to dashboard maybe?
          dispatch(loadUserData(user.uid));
          navigate('/dashboard');

          // todo this defs to dashboard? or maybe in component
          console.log(asciiLogo);
        } else {
          setIsPageLoading(false);
        }
      });
    }
  }, [dispatch, navigate]);

  // useEffect(() => {
  //   let mounted = true;

  //   console.log('LoginPage.useEffect');

  //   // todo move and rename. setUserData?
  //   const handleLogin = async (user: User) => {
  //     const credential = await firebase.auth().getRedirectResult();
  //     // Using store.dispatch as useDispatch cannot be used outside of functional components
  //     dispatch(login({ user, isNew: credential.additionalUserInfo?.isNewUser }));
  //   };

  //   // const handleLogin = async (user: firebase.User) => {
  //   //   const credential = await firebase.auth().getRedirectResult();
  //   //   // Using store.dispatch as useDispatch cannot be used outside of functional components
  //   //   dispatch(login({ user, isNew: credential.additionalUserInfo?.isNewUser }));
  //   // };
  //   // if (isFirstUpdate) {
  //   //   console.log('first update');
  //   //   setIsFirstUpdate(false);
  //   //   return;
  //   // }

  //   // if (firstUpdate.current) {
  //   //   console.log('first update');
  //   //   firstUpdate.current = false;
  //   //   return;
  //   // }

  //   // if (loading) {
  //   //   console.log('loading');
  //   //   setIsPageLoading(true);

  //   //   // maybe trigger a loading screen
  //   //   return;
  //   // }
  //   if (user) {
  //     console.log('got user', user);
  //     if (mounted) setIsPageLoading(true);
  //     void handleLogin(user);
  //     // return () => {
  //     //   setState({}); // This worked for me
  //     // };
  //     navigate('/dashboard');
  //     // setIsPageLoading(false);
  //     return;
  //   }
  //   return () => {
  //     mounted = false;
  //   };
  //   // todo review
  // });

  return isPageLoading ? (
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
