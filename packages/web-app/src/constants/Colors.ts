import { ColorName } from '@zaino/shared';
import styles from '../styles/base/_export.scss';

// TODO: split into three files
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
