/**
 * Get prefetch links for images to be inserted into the HTML header by HtmlWebpackPlugin.
 * This is obviously a hack until a better solution (one SVG file with sprites?) is implemented.
 * todo see #176 for more details
 */

const fileNames = [
  'jacket.svg',
  'shorts.svg',
  'gloves.svg',
  'hat.svg',
  'socks.svg',
  'boots.svg',
  'backpack.svg',
  'poles.svg',
  'pickaxe.svg',
  'tent.svg',
  'stove.svg',
  'hook.svg',
  'compass.svg',
  'gps.svg',
  'knife.svg',
];

export const getPrefetchLinks = () => {
  return fileNames.reduce((linksString, fileName) => {
    return `${linksString}<link rel="prefetch" href="${
      process.env.GCP_STORAGE_URL as string
    }/categories/${fileName}" />`;
  }, '');
};
