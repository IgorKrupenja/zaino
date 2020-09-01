import dotenv from 'dotenv';

/** This is a hacky workaround to pass a region variable from .env to Firebase functions.
 * Unfortunately, there seems to be no other way to do this
 * The function is called with firebase functions:config:get in the build script for the package.
 */
const getRegion = () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  dotenv.config({ path: `../../../../.env.${process.env.NODE_ENV}` });
  // need to print to console for firebase functions:config:get
  console.log(process.env.FIREBASE_FUNCTIONS_REGION);
};

getRegion();
