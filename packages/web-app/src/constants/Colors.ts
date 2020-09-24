import styles from '../styles/base/_settings.scss';

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
  { name: 'light-blue', fancyName: 'Sky', hexValue: styles.lightBlue },
  { name: 'blue', fancyName: 'Sea', hexValue: styles.blue },
  { name: 'red', fancyName: 'Sunset', hexValue: styles.red },
  { name: 'orange', fancyName: 'Autumn', hexValue: styles.orange },
  { name: 'yellow', fancyName: 'Beach', hexValue: styles.yellow },
  { name: 'purple', fancyName: 'Flower', hexValue: styles.purple },
  { name: 'green', fancyName: 'Grass', hexValue: styles.green },
  { name: 'dark-green', fancyName: 'Forest', hexValue: styles.darkGreen },
  { name: 'brown', fancyName: 'Mountain', hexValue: styles.brown },
  { name: 'dark-blue', fancyName: 'Storm', hexValue: styles.darkBlue },
  { name: 'grey', fancyName: 'Winter', hexValue: styles.grey },
];

export const getRandomColor = () => Colors[Math.floor(Math.random() * Colors.length)];
