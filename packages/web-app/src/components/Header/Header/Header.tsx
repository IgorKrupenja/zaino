import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import DashboardIcon from '../../../images/icons/dashboard.svg';
import LabelIcon from '../../../images/icons/label.svg';
import { LabelSortOption, sortLabelsBy } from '../../../state/slices/labelsFilters';
import { RootState } from '../../../state/store';
import { Button } from '../../Controls/Button';
import { AccountDetails } from '../AccountDetails';
import { DemoData } from '../DemoData';
import './style.scss';

export const Header = () => {
  const dispatch = useDispatch();
  const labelSortOption = useSelector((state: RootState) => state.labelsFilters.sortBy);
  const location = useLocation();

  const getNavButtonClass = (path: string) => {
    return `button button--underline${
      // return active class if only for button for current path
      location.pathname === path ? ' button--underline--active' : ''
    }`;
  };

  return (
    // container div to properly style header
    <div className="header__container">
      <header className="header">
        <h1>
          <Link to="/dashboard" className="header__title">
            Zaino
          </Link>
        </h1>
        <nav className="header__nav">
          <Button className={getNavButtonClass('/dashboard')}>
            <DashboardIcon className="header__nav__icon" />
            <NavLink to="/dashboard" className="header__nav__link">
              Dashboard
            </NavLink>
          </Button>
          <Button className={getNavButtonClass('/labels')}>
            <LabelIcon className="header__nav__icon" />
            <NavLink
              to="/labels"
              // re-sort labels by name after in-place edit and switching back to Labels page
              // see slices/labels for more details
              onClick={() =>
                labelSortOption === LabelSortOption.lastSortOrder &&
                dispatch(sortLabelsBy(LabelSortOption.name))
              }
              className="header__nav__link"
            >
              Labels
            </NavLink>
          </Button>
        </nav>
        <DemoData />
        <AccountDetails />
      </header>
    </div>
  );
};
