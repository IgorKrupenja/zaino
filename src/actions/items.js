import { v4 as uuid } from 'uuid';

export const addItem = ({ name = '', category = '', tags = [], weight = 0, quantity = 1 }) => ({
  type: 'ADD_ITEM',
  item: { id: uuid(), name, category, tags, weight, quantity },
});
