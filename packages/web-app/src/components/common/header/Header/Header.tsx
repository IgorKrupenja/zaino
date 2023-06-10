import './Header.scss';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactComponent as CategoryIcon } from '../../../../images/icons/category.svg';
import { ReactComponent as DashboardIcon } from '../../../../images/icons/dashboard.svg';
import { ReactComponent as LabelIcon } from '../../../../images/icons/label.svg';
import { ReactComponent as Logo } from '../../../../images/logo.svg';
import { CollectionSortOption } from '../../../../state/enums';
import { sortLabelsBy } from '../../../../state/slices/labelFiltersSlice';
import { RootState } from '../../../../state/store';
import { Button } from '../../controls/Button';
import { AccountDetails } from '../AccountDetails';
import { DemoData } from '../DemoData';

export const Header = () => {
  const dispatch = useDispatch();
  const labelSortOption = useSelector((state: RootState) => state.labelFilters.sortBy);

  return (
    <div className="header__container">
      <header className="header">
        <Link className="header__logo__link" to="/dashboard">
          <Logo className="header__logo" />
        </Link>
        <nav className="header__nav">
          <Button className="header__nav__link" navLinkTo="/dashboard" variant="underline">
            <DashboardIcon className="header__nav__link__icon" />
            <span className="header__nav__link__text">Dashboard</span>
          </Button>
          {process.env.REACT_APP_SHOW_CATEGORIES_PAGE === 'true' && (
            // TODO: re-sort categories on page change, see labels below
            <Button className="header__nav__link" navLinkTo="/categories" variant="underline">
              <CategoryIcon className="header__nav__link__icon" />
              <span className="header__nav__link__text">Categories</span>
            </Button>
          )}
          <Button
            className="header__nav__link"
            // re-sort labels by name after in-place edit and switching back to Labels page
            // see slices/labels for more details
            onClick={() =>
              labelSortOption === CollectionSortOption.lastSortOrder &&
              dispatch(sortLabelsBy(CollectionSortOption.name))
            }
            navLinkTo="/labels"
            variant="underline"
          >
            <LabelIcon className="header__nav__link__icon" />
            <span className="header__nav__link__text">Labels</span>
          </Button>
        </nav>
        <DemoData />
        <AccountDetails />
      </header>
    </div>
  );
};
