// function deployment fails if using synthetic import here
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
// firebase-tools do not have types
// @ts-ignore
import * as tools from 'firebase-tools';
// two below should have been import from @zaino/shared but that is broken in Firebase, see #223
import { Item, Label } from '../../shared/';
import demoData from '../../shared/src/demo-data/output-data.json';

export const addDemoDataDb = functions
  .region(functions.config().settings.region)
  .pubsub.topic('add-demo-data-db')
  .onPublish(async () => {
    const root = '/common/demo-data';
    const items: Item[] = demoData.items;
    const labels: Label[] = demoData.labels;
    const db = admin.firestore();

    // delete previously added demo data
    await tools.firestore.delete(root, {
      project: process.env.GCLOUD_PROJECT,
      recursive: true,
      yes: true,
    });

    // add demo data
    const batch = db.batch();
    items.forEach(item => {
      const itemRef = db.collection(`${root}/items`).doc(item.id);
      batch.set(itemRef, item);
    });
    labels.forEach(label => {
      const itemRef = db.collection(`${root}/labels`).doc(label.id);
      batch.set(itemRef, label);
    });

    try {
      console.log('Started writing demo data to Firestore.');
      await batch.commit();
    } catch (error) {
      throw new Error(`addDemoDataDb: Writing demo data to Firestore failed.\n${error as string}`);
    }

    console.log('addDemoDataDb: Writing demo data to Firestore successful!');
  });
