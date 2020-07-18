// todo temp remove later
const reducerDefaultState = [
  {
    id: '12334asd',
    name: 'Light backpack',
    category: 'Backpacks',
    tags: ['Male', 'Grey case'],
    weight: 380,
    quantity: 2,
  },
];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.item];
  }
};
