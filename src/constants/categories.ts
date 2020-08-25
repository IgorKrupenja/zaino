export enum CategoryName {
  backpacks = 'Backpacks & bags',
  tents = 'Tents',
}

export const categories: { name: CategoryName; imageFileName: string }[] = [
  { name: CategoryName.backpacks, imageFileName: 'backpack.svg' },
  { name: CategoryName.tents, imageFileName: 'tent.svg' },
];
