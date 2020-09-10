declare module '*.svg' {
  // const content: string;
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>> | string;
  export default content;
}
