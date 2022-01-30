/**
 * Get properly formatted CSS class string from main class name and optional extra name(s).
 * Used in conjunction with className props that accept strings.
 */
export const getClassString = (mainClassName: string, extraClassNames?: string) => {
  return mainClassName + (extraClassNames ? ` ${extraClassNames}` : '');
};
