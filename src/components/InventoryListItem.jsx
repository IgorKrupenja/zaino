import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const InventoryListItem = item => {
  const { id, name, category, labels, weight, size, quantity } = item;
  return (
    <article>
      <h3>
        <Link to={{ pathname: `/edit/${id}`, state: { item } }}>{name}</Link>
      </h3>
      <img
        src={require(`../images/categories/${category.toLowerCase()}.svg`)}
        className="list-item__image"
      />
      <p>{category}</p>
      <p>
        {weight}g {quantity > 1 && `Qty: ${quantity}`} {size && `Size: ${size}`}
      </p>
      <ul>
        {/* get all labels from store with all the needed details (id's in addition to names) */}
        {useSelector(state => state.labels)
          // filter to get only selected labels for a particular item
          .filter(label => labels.includes(label.id))
          // render
          .map(label => (
            <li key={label.id}>{label.name}</li>
          ))}
      </ul>
      <button>Add to pack</button>
    </article>
  );
};

export default InventoryListItem;
