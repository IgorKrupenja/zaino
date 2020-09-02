import dotenv from 'dotenv';

/**
 * This is a hacky workaround to pass a region variable from .env to Firebase functions.
 * Unfortunately, there seems to be no other way to do this.
 * The function is called with firebase functions:config:set in the build scripts for the package.
 */
const getRegion = () => {
  process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';
  dotenv.config({ path: `../../.env.${process.env.NODE_ENV}` });
  // need to use console.log here and not return for the build script to pickup region
  // also setting region to default (us-central1) in case nothing is specified in .env file
  console.log(process.env.FIREBASE_FUNCTIONS_REGION ?? 'us-central1');
};

getRegion();
