import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/auth';
import { resetItemsState } from '../slices/items';
import { resetLabelsState } from '../slices/labels';

const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = (): void => {
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
