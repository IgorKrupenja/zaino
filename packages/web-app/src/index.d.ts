declare module '*.svg' {
  const content: string | React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  // const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
