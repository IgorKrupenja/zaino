// needed to correctly import settings SCSS in TS
// exact types needed to get Intellisense in VSCode
export type settings = {
  xsSize: string;
  sSize: string;
  lSize: string;
  xlSize: string;
  fontSizeSmall: string;
  lightGrey: string;
  grey: string;
  midGrey: string;
  offBlack: string;
  lightBlue: string;
  offWhite: string;
  extraLightGrey: string;
  border: string;
};

export const styles: settings;
export default styles;
