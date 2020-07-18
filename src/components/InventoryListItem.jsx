import React from 'react';
import TagsList from './TagsList';
import Placeholder from '../images/categories/backpacks.svg';

const InventoryListItem = ({ name, category, tags, weight, quantity }) => {
  // function importAll(r) {
  //   const images = {};
  //   r.keys().map((item, index) => {
  //     images[item.replace('./', '')] = r(item);
  //   });
  //   return images;
  // }

  // const images = importAll(
  //   require.context('../../public/images/categories', false, /\.(png|jpe?g|svg)$/)
  // );
  return (
    <article>
      <h3>{name}</h3>
      <img src={Placeholder} />
      {/* <img src={images['backpacks.svg']} /> */}
      <p>{category}</p>
      <p>
        {weight}g {quantity > 1 && `Qty: ${quantity}`}
      </p>
      <TagsList tags={tags} />
      <button>Add to pack</button>
    </article>
  );
};

export default InventoryListItem;
