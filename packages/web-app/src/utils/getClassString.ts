/**
 * Get properly formatted CSS class string from main class name and optional extra name(s).
 */
// TODO: Should probably support arrays, overall a bit fishy
export const getClassString = (mainClassName: string, extraClassNames?: string) => {
  return mainClassName + (extraClassNames ? ` ${extraClassNames}` : '');
};
