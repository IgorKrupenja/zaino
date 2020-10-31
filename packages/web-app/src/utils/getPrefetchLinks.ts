import Categories from '../constants/Categories';

/**
 * Get prefetch links for images to be inserted into the HTML header by HtmlWebpackPlugin.
 * This is obviously a hack until a better solution (one SVG file with sprites?) is implemented.
 * todo see #176 for more details
 */
export const getPrefetchLinks = () => {
  return Categories.reduce((linksString, category) => {
    return `${linksString}<link rel="prefetch" href="${
      process.env.GCP_STORAGE_URL as string
    }/categories/${category.imageFileName}" />`;
  }, '');
};
