export type ColorName =
  | 'Sky'
  | 'Sea'
  | 'Sunset'
  | 'Autumn'
  | 'Beach'
  | 'Flower'
  | 'Grass'
  | 'Forest'
  | 'Mountain'
  | 'Storm'
  | 'Winter';

export type Color = {
  name: ColorName;
  hexValue: string;
  // needed for styling background for 'Create label' in LabelSelect
  __isNew__?: boolean;
};

export const Colors: Color[] = [
  { name: 'Sky', hexValue: '#00BDFE' },
  { name: 'Sea', hexValue: '#0052CC' },
  { name: 'Sunset', hexValue: '#FF5630' },
  { name: 'Autumn', hexValue: '#F89228' },
  { name: 'Beach', hexValue: '#ECB500' },
  { name: 'Flower', hexValue: '#DE67B6' },
  { name: 'Grass', hexValue: '#5DBF08' },
  { name: 'Forest', hexValue: '#00875A' },
  { name: 'Mountain', hexValue: '#7C4A35' },
  { name: 'Storm', hexValue: '#253858' },
  { name: 'Winter', hexValue: '#666666' },
];

export const getRandomColor = () => Colors[Math.floor(Math.random() * Colors.length)];
