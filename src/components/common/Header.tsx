import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../state/slices/auth';
import { resetItemsState } from '../../state/slices/items';
import { resetLabelsState } from '../../state/slices/labels';

const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = (): void => {
    // todo maybe use batch?
    dispatch(logout());
    dispatch(resetItemsState());
    dispatch(resetLabelsState());
  };

  return (
    <header>
      <h1>
        <Link to="/dashboard">Zaino</Link>
      </h1>
      <NavLink to="/dashboard" activeClassName="is-active">
        Dashboard
      </NavLink>
      <NavLink to="/labels" activeClassName="is-active">
        Labels
      </NavLink>
      <button onClick={handleLogout}>Sign out</button>
    </header>
  );
};

export default Header;
