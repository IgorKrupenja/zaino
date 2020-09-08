import React from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../state/slices/auth';
import { resetItemsState } from '../../state/slices/items';
import { resetLabelsState } from '../../state/slices/labels';
import { LabelSortOption, sortLabelsBy } from '../../state/slices/labelsFilters';
import { RootState } from '../../state/store';
import DemoData from './DemoData';

const Header = () => {
  const dispatch = useDispatch();
  const labelSortOption = useSelector((state: RootState) => state.labelsFilters.sortBy);
  const handleLogout = () => {
    // potentially faster perf with batch
    batch(() => {
      dispatch(logout());
      dispatch(resetItemsState());
      dispatch(resetLabelsState());
    });
  };

  return (
    <header>
      <Link className="header-logo" to="/dashboard"></Link>
      <nav>
        <NavLink to="/dashboard" activeClassName="is-active">
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
          activeClassName="is-active"
        >
          Labels
        </NavLink>
      </nav>
      <DemoData />
      <button onClick={handleLogout}>Sign out</button>
    </header>
  );
};

export default Header;
