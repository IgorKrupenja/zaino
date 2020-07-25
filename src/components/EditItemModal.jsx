import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Redirect, withRouter } from 'react-router-dom';
import { editItem, deleteItem } from '../slices/items';
import ItemModal, { closeModal } from './ItemModal';

const EditItemModal = props => {
  // hide modal if location is not 'edit'
  const location = useLocation();
  if (location.pathname.match(/add|dashboard/)) {
    return null;
  }

  // redirect to Dashboard if item id is invalid
  // Redirect is better than history.push here
  // as history stack will not be populated with edit/invalid-id
  if (!props.location.state) return <Redirect to="/dashboard" />;
  const item = props.location.state.item;

  const dispatch = useDispatch();
  return (
    <ItemModal item={item} onSubmit={updates => editItem({ id: item.id, ...updates })}>
      <button
        onClick={() => {
          closeModal();
          dispatch(deleteItem(item.id));
        }}
      >
        Delete item
      </button>
    </ItemModal>
  );
};

// wrapping in withRouter HOC to access props.location.state passed from list item
export default withRouter(EditItemModal);
