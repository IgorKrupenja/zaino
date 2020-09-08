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
  { name: 'dark-green', fancyName: 'Forest', hexValue: '#00875A' },
  { name: 'brown', fancyName: 'Mountain', hexValue: '#7C4A35' },
  { name: 'dark-blue', fancyName: 'Storm', hexValue: '#253858' },
  { name: 'grey', fancyName: 'Winter', hexValue: '#666666' },
];

export const getRandomColor = () => Colors[Math.floor(Math.random() * Colors.length)];
