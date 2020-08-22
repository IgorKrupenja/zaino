import { labelColorOptions } from '../constants/labelColorOptions';

export default () => {
  return labelColorOptions[Math.floor(Math.random() * labelColorOptions.length)].value;
};
