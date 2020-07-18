import React from 'react';

const TagsList = ({ tags }) => (
  <ul>
    {tags.map(tag => (
      <li key={tag}>{tag}</li>
    ))}
  </ul>
);

export default TagsList;
