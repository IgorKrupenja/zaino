// new item event for with no id item about to be created in Firestore
export type NewItemEvent = {
  name: string;
  category: string;
  labels: string[];
  weight: number;
  size: string;
  quantity: number;
  notes: string;
  quantityInPack: number;
};

// item with id that is already added to Firestore
export type Item = NewItemEvent & { id: string };

export type Label = {
  id: string;
  name: string;
  color: string;
};

// const test: Item = {
//   name: '',
//   category: 'Backpacks',
//   weight: '100',
//   size: '',
//   quantity: 1,
//   notes: '',
//   quantityInPack: 0,
// };

// console.log(test);
