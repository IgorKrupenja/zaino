import { ColorName } from '@zaino/shared';
import styles from '../styles/base/_export.scss';

type Color = {
  name: ColorName;
  fancyName: string;
  hexValue: string;
};

export const colors: Color[] = [
  { fancyName: 'Sky', hexValue: styles.lightBlue, name: 'light-blue' },
  { fancyName: 'Sea', hexValue: styles.blue, name: 'blue' },
  { fancyName: 'Sunset', hexValue: styles.red, name: 'red' },
  { fancyName: 'Autumn', hexValue: styles.orange, name: 'orange' },
  { fancyName: 'Beach', hexValue: styles.yellow, name: 'yellow' },
  { fancyName: 'Flower', hexValue: styles.purple, name: 'purple' },
  { fancyName: 'Grass', hexValue: styles.green, name: 'green' },
  { fancyName: 'Forest', hexValue: styles.darkGreen, name: 'dark-green' },
  { fancyName: 'Mountain', hexValue: styles.brown, name: 'brown' },
  { fancyName: 'Storm', hexValue: styles.darkBlue, name: 'dark-blue' },
  { fancyName: 'Winter', hexValue: styles.grey, name: 'grey' },
];
