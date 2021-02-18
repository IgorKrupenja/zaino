import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import DashboardIcon from '../../../images/icons/dashboard.svg';
import LabelIcon from '../../../images/icons/label.svg';
import CategoryIcon from '../../../images/icons/category.svg';
import { sortLabelsBy } from '../../../state/slices/labelsFilters';
import { RootState } from '../../../state/store';
import { AccountDetails } from '../AccountDetails';
import logo from '../../../images/b-test.jpg';
import { DemoData } from '../DemoData';
import './style.scss';
import { CollectionSortOption } from '../../../state/collectionSettings';

export const Header = () => {
  const dispatch = useDispatch();
  const labelSortOption = useSelector((state: RootState) => state.labelsFilters.sortBy);

  return (
    // container div to properly style header
    <div className="header__container">
      <header className="header">
        {/* todo temporary logo and styles */}
        <Link
          style={{ display: 'inline-block', width: '5rem', height: '5rem' }}
          to="/dashboard"
          className="header__title"
        >
          <img style={{ width: '5rem', height: '5rem' }} src={logo}></img>
        </Link>
        <nav className="header__nav">
          <NavLink
            to="/dashboard"
            className="button button--underline header__nav__link"
            activeClassName="button--underline--active"
          >
            <DashboardIcon className="header__nav__link__icon" />
            <span className="header__nav__link__text">Dashboard</span>
          </NavLink>
          <NavLink
            to="/categories"
            // todo
            // // re-sort labels by name after in-place edit and switching back to Labels page
            // // see slices/labels for more details
            // onClick={() =>
            //   labelSortOption === LabelSortOption.lastSortOrder &&
            //   dispatch(sortLabelsBy(LabelSortOption.name))
            // }
            className="button button--underline header__nav__link"
            activeClassName="button--underline--active"
          >
            <CategoryIcon className="header__nav__link__icon" />
            <span className="header__nav__link__text">Categories</span>
          </NavLink>
          <NavLink
            to="/labels"
            // re-sort labels by name after in-place edit and switching back to Labels page
            // see slices/labels for more details
            onClick={() =>
              labelSortOption === CollectionSortOption.lastSortOrder &&
              dispatch(sortLabelsBy(CollectionSortOption.name))
            }
            className="button button--underline header__nav__link"
            activeClassName="button--underline--active"
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
