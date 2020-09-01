// note that function deploy fails if using synthetic import here
import * as functions from 'firebase-functions';

export const backupDb = functions
  .region(functions.config().settings.region)
  .pubsub.schedule('every 24 hours')
  .onRun(context => {
    console.log('This will be run every 24h');
    return null;
  });
