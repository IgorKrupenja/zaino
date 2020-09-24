// Unused ideas:
// ocean, sun, tree, earth, spring, summer
// also e.g. https://cdn.shopify.com/s/files/1/0028/6733/1137/products/Brio_Custom_colors_6x6_with_names_db281676-fbca-4e31-80d3-6cd5c98cca08_1400x.jpg?v=1571087350

export type ColorName =
  | 'light-blue'
  | 'blue'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'purple'
  | 'green'
  | 'dark-green'
  | 'brown'
  | 'dark-blue'
  | 'grey';

export type Color = {
  name: ColorName;
  fancyName: string;
  hexValue: string;
  // needed for styling background for 'Create label' in LabelSelect
  __isNew__?: boolean;
};

export const Colors: Color[] = [
  { name: 'light-blue', fancyName: 'Sky', hexValue: '#00BDFE' },
  { name: 'blue', fancyName: 'Sea', hexValue: '#0052CC' },
  { name: 'red', fancyName: 'Sunset', hexValue: '#FF5630' },
  { name: 'orange', fancyName: 'Autumn', hexValue: '#F89228' },
  { name: 'yellow', fancyName: 'Beach', hexValue: '#ECB500' },
  { name: 'purple', fancyName: 'Flower', hexValue: '#DE67B6' },
  { name: 'green', fancyName: 'Grass', hexValue: '#5DBF08' },
  { name: 'dark-green', fancyName: 'Forest', hexValue: '#068c06' },
  { name: 'brown', fancyName: 'Mountain', hexValue: '#7C4A35' },
  { name: 'dark-blue', fancyName: 'Storm', hexValue: '#253858' },
  { name: 'grey', fancyName: 'Winter', hexValue: '#666666' },
];

export const getRandomColor = () => Colors[Math.floor(Math.random() * Colors.length)];
