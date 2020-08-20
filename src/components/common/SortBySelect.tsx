import React, { ChangeEvent } from 'react';
import { ItemSortOption } from '../../types/items';
import { LabelSortOption } from '../../types/labels';

type SortBySelectProps = {
  options: typeof LabelSortOption | typeof ItemSortOption;
  onSortChange: (value: string) => void;
  sortBy: LabelSortOption | ItemSortOption;
};

const SortBySelect = ({ options, onSortChange, sortBy }: SortBySelectProps) => {
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.persist();
    onSortChange(e.target.value);
  };

  return (
    <label>
      Sort by
      <select name="sortBy" value={sortBy} onChange={onChange}>
        {Object.values(options).map((value: typeof sortBy) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SortBySelect;
