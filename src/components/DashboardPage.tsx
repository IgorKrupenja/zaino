import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import selectItems, { selectPackItems } from '../selectors/items';
import { RootState } from '../store/store';
import { Item } from '../types/types';
import List from './List/List';
import ListFilters from './Filters/ListFilters';
import AddItemModal from './ItemModal/AddItemModal';
import EditItemModal from './ItemModal/EditItemModal';
import InventoryListItem from './List/InventoryListItem';
import PackListItem from './List/PackListItem';

const DashboardPage = () => (
  <div className="dashboard">
    <ListFilters />
    {/* Inventory list */}
    <List
      // a bit of a hack: shallowEqual prevents re-renders when items in store do not change
      // (i.e. new filter conditions result in the same matching items)
      // https://react-redux.js.org/api/hooks#equality-comparisons-and-updates
      items={useSelector((state: RootState) => selectItems(state), shallowEqual).map(
        (item: Item) => (
          <InventoryListItem key={item.id} {...item} />
        )
      )}
      title="inventory"
    >
      <Link to="/add">Add item</Link>
    </List>
    {/* Pack list */}
    <List
      items={useSelector((state: RootState) => selectPackItems(state), shallowEqual).map(
        (item: Item) => (
          <PackListItem key={item.id} {...item} />
        )
      )}
      title="pack"
    />
    <AddItemModal />
    <EditItemModal />
  </div>
);

export default DashboardPage;
