import React from 'react';

// todo not sure if needs separate Component
const TagsList = ({ tags }) => (
  <ul>
    {tags.map(tag => (
      <li key={tag}>{tag}</li>
    ))}
  </ul>
);

export default TagsList;
