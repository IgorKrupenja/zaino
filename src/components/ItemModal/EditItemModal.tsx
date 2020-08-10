import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { updateItem, deleteItem } from '../../slices/items';
import ItemModal, { closeModal } from './ItemModal';
import { Item } from '../../types/types';
import { decrementItemCount } from '../../slices/labels';

// somewhat unclear how to use typings here properly
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/17355
type EditItemModalProps = RouteComponentProps<
  undefined, // this.props.match.params.myParamProp, not used
  any, // history, not used
  { item: Item } // this.props.location.state.item
>;

const EditItemModal = (props: EditItemModalProps) => {
  const dispatch = useDispatch();
  // hide modal if location is not 'edit'
  if (useLocation().pathname.match(/add|dashboard/g)) return null;

  // redirect to Dashboard if item id is invalid
  // Redirect is better than history.push here
  // as history stack will not be populated with edit/invalid-id
  if (!props.location.state) return <Redirect to="/dashboard" />;
  const item = props.location.state.item;

  return (
    <ItemModal
      item={item}
      title={`${item.name} | Zaino`}
      onSubmit={(item: Item) => updateItem({ ...item })}
    >
      <button
        onClick={() => {
          closeModal();
          item.labels?.forEach(label => dispatch(decrementItemCount(label)));
          dispatch(deleteItem(item.id));
        }}
      >
        Delete item
      </button>
    </ItemModal>
  );
};

// wrapping in withRouter HOC to access props.location.state
export default withRouter(EditItemModal);
