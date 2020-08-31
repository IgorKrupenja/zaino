// note that function deploy fails if using synthetic import here
import * as functions from 'firebase-functions';
import regionJson from '../region.json';

export const backupDb = functions
  .region(regionJson.region)
  .pubsub.schedule('every 24 hours')
  .onRun(context => {
    console.log('This will be run every 24h');
    return null;
  });
