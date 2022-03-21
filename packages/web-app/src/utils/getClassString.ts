export const getClassString = (
  mainClassName: string,
  params: {
    extraClassNames?: string;
    variant?: string;
  }
) => {
  return (
    mainClassName +
    (params.extraClassNames ? ` ${params.extraClassNames}` : '') +
    (params.variant ? ` ${mainClassName}--${params.variant}` : '')
  );
};
