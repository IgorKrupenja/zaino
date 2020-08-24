export enum CategoryName {
  backpacks = 'Backpacks & bags',
  tents = 'Tents',
}

type Categories = Array<{ name: CategoryName; imagePath: string }>;

export const categories: Categories = [
  { name: CategoryName.backpacks, imagePath: 'backpack.svg' },
  { name: CategoryName.tents, imagePath: 'tent.svg' },
];
