import React from 'react';
import TagsList from './TagsList';

const InventoryListItem = ({ name, category, tags, weight, size, quantity }) => {
  return (
    <article>
      <h3>{name}</h3>
      <img
        src={require(`../images/categories/${category.toLowerCase()}.svg`)}
        className="list-item__image"
      />
      <p>{category}</p>
      <p>
        {weight}g {quantity > 1 && `Qty: ${quantity}`} {size && `Size: ${size}`}
      </p>
      <TagsList tags={tags} />
      <button>Add to pack</button>
    </article>
  );
};

export default InventoryListItem;
