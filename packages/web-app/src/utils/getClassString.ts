/**
 * Get CSS properly formatted class string if className is defined, empty string otherwise.
 * Used in many components for styling.
 */
export const getClassString = (className: string | undefined) => (className ? ` ${className}` : '');
