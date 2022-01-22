// note that function deploy fails if using synthetic import here
import firestore from '@google-cloud/firestore';
import * as functions from 'firebase-functions';
// import { bucket } from 'firebase-functions/lib/providers/storage';
import functionsRegion from './utils/functionsRegion';

const client = new firestore.v1.FirestoreAdminClient();
const bucket = 'gs://zaino-backups';

export const backupDb = functions
  .region(functionsRegion)
  .pubsub.schedule('every 24 hours')
  .onRun(async () => {
    console.log('backupDb: starting DB backup...');

    const projectId = process.env.GCP_PROJECT || (process.env.GCLOUD_PROJECT as string);
    const databaseName = client.databasePath(projectId, '(default)');

    try {
      await client.exportDocuments({
        name: databaseName,
        outputUriPrefix: bucket,
        // collectionIds empty to export all collections
        collectionIds: [],
      });
    } catch (error) {
      console.error(error);
      throw new Error('backupDb: DB backup operation failed.');
    }

    console.log('backupDb: DB backup successful.');
  });
