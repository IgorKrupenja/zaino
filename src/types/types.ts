export type Item = {
  id: string;
  name: string;
  category: string;
  labels: string[];
  weight: number;
  size: string;
  quantity: number;
  notes: string;
  quantityInPack: number;
};

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
