import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as DashboardIcon } from '../../../images/icons/dashboard.svg';
import { ReactComponent as LabelIcon } from '../../../images/icons/label.svg';
import { ReactComponent as Logo } from '../../../images/logo.svg';
import { CollectionSortOption } from '../../../state/collectionSettings';
import { sortLabelsBy } from '../../../state/slices/labelsFilters';
import { RootState } from '../../../state/store';
import { AccountDetails } from '../AccountDetails';
import { DemoData } from '../DemoData';
import './style.scss';

export const Header = () => {
  const dispatch = useDispatch();
  const labelSortOption = useSelector((state: RootState) => state.labelsFilters.sortBy);

  return (
    // container div to properly style header
    <div className="header__container">
      <header className="header">
        <Link className="header__logo__link" to="/dashboard">
          <Logo className="header__logo" />
        </Link>
        <nav className="header__nav">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `button button--underline header__nav__link ${
                isActive ? 'button--underline--active' : ''
              }`
            }
          >
            <DashboardIcon className="header__nav__link__icon" />
            <span className="header__nav__link__text">Dashboard</span>
          </NavLink>
          <NavLink
            to="/labels"
            // re-sort labels by name after in-place edit and switching back to Labels page
            // see slices/labels for more details
            onClick={() =>
              labelSortOption === CollectionSortOption.lastSortOrder &&
              dispatch(sortLabelsBy(CollectionSortOption.name))
            }
            className={({ isActive }) =>
              `button button--underline header__nav__link ${
                isActive ? 'button--underline--active' : ''
              }`
            }
          >
            <LabelIcon className="header__nav__link__icon" />
            <span className="header__nav__link__text">Labels</span>
          </NavLink>
        </nav>
        <DemoData />
        <AccountDetails />
      </header>
    </div>
  );
};
