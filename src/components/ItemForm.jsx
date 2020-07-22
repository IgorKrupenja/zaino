import React from 'react';
import { history } from '../routers/AppRouter';
import { useParams } from 'react-router-dom';

const ItemForm = props => {
  const onSubmit = e => {
    e.preventDefault();

    // todo temporary
    props.onSubmit({
      name: 'LEMON backpack',
      category: 'Backpacks',
      tags: ['Female', 'Grey case'],
      weight: 1660,
      size: 'S',
      quantity: 1,
    });
    history.push('/dashboard');
  };

  return (
    <form onSubmit={onSubmit}>
      <button>Save item (submit form)</button>
    </form>
  );
};

export default ItemForm;
