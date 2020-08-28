import LabelColorOptions from '../constants/labelColorOptions';

export default () => {
  return LabelColorOptions[Math.floor(Math.random() * LabelColorOptions.length)];
};
