import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as CategoryIcon } from '../../../images/icons/category.svg';
import { ReactComponent as DashboardIcon } from '../../../images/icons/dashboard.svg';
import { ReactComponent as LabelIcon } from '../../../images/icons/label.svg';
import { ReactComponent as Logo } from '../../../images/logo.svg';
import { CollectionSortOption } from '../../../state/enums';
import { sortLabelsBy } from '../../../state/slices/labelFiltersSlice';
import { RootState } from '../../../state/store';
import { AccountDetails } from '../AccountDetails';
import { DemoData } from '../DemoData';
import './style.scss';

export const Header = () => {
  const dispatch = useDispatch();
  const labelSortOption = useSelector((state: RootState) => state.labelFilters.sortBy);

  const getLinkClassName = (isActive: boolean) =>
    `button button--underline header__nav__link ${isActive ? 'button--underline--active' : ''}`;

  return (
    <div className="header__container">
      <header className="header">
        <Link className="header__logo__link" to="/dashboard">
          <Logo className="header__logo" />
        </Link>
        <nav className="header__nav">
          <NavLink to="/dashboard" className={({ isActive }) => getLinkClassName(isActive)}>
            <DashboardIcon className="header__nav__link__icon" />
            <span className="header__nav__link__text">Dashboard</span>
          </NavLink>
          <NavLink
            to="/categories"
            // TODO: re-sort categories on page change, see labels below
            className={({ isActive }) => getLinkClassName(isActive)}
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
            className={({ isActive }) => getLinkClassName(isActive)}
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
