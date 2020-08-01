import React from 'react';
import { NavLink } from 'react-router-dom';
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
        <NavLink to="/dashboard" activeClassName="is-active">
          Zaino
        </NavLink>
      </h1>
      <button onClick={handleLogout}>Sign out</button>
    </header>
  );
};

export default Header;
