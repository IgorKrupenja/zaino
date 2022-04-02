export const getClassString = (
  mainClassName: string,
  params: {
    extraClassNames?: string;
    variant?: string | string[];
  }
) => {
  let variantClassNames = '';

  if (params.variant) {
    if (Array.isArray(params.variant)) {
      const temp = params.variant.map((variant) => ` ${mainClassName}--${variant}`);
      variantClassNames = temp.join('');
    } else {
      variantClassNames = ` ${mainClassName}--${params.variant}`;
    }
  }

  return (
    mainClassName + (params.extraClassNames ? ` ${params.extraClassNames}` : '') + variantClassNames
  );
};
