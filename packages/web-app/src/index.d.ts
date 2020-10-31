declare module '*.svg' {
  // either React component when importing in TS
  // or a string with path to file when importing in SCSS
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>> | string;
  export default content;
}

declare module '*.png' {
  const value: string;
  export default value;
}
