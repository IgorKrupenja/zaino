/**
 * Get properly formatted CSS class string from main class name and optional extra name(s).
 * Used in many components for styling.
 */
export const getClassString = (mainClassName: string, extraClassNames?: string) => {
  return mainClassName + (extraClassNames ? ` ${extraClassNames}` : '');
};
