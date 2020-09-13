import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { LabelSortOption, sortLabelsBy } from '../../../state/slices/labelsFilters';
import { RootState } from '../../../state/store';
import { AccountDetails } from '../AccountDetails';
import { DemoData } from '../DemoData';
import './style.scss';

export const Header = () => {
  const dispatch = useDispatch();
  const labelSortOption = useSelector((state: RootState) => state.labelsFilters.sortBy);
  // const handleLogout = () => {
  //   // potentially faster perf with batch
  //   batch(() => {
  //     dispatch(logout());
  //     dispatch(resetItemsState());
  //     dispatch(resetLabelsState());
  //   });
  // };

  return (
    <header className="header">
      <h1>
        <Link to="/dashboard" className="header__title">
          Zaino
        </Link>
      </h1>
      <nav className="header__nav">
        <NavLink
          to="/dashboard"
          className="button button--underline button--link"
          activeClassName="button--underline--active"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/labels"
          // re-sort labels by name after in-place edit and switching back to Labels page
          // see slices/labels for more details
          onClick={() =>
            labelSortOption === LabelSortOption.lastSortOrder &&
            dispatch(sortLabelsBy(LabelSortOption.name))
          }
          className="button button--underline button--link"
          activeClassName="button--underline--active"
        >
          Labels
        </NavLink>
      </nav>
      <DemoData />
      <AccountDetails />
      {/* <button className="header__link" onClick={handleLogout}>
        Sign out
      </button> */}
    </header>
  );
};
