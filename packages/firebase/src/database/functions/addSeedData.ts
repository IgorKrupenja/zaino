// function deployment fails if using synthetic imports here
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
// Should import from @zaino/shared but that is broken in Firebase, see #223
import { Category, Item, Label } from '../../../../shared';
import seedData from '../seed-data/seed-data.json';
import { settings } from '../../utils/settings';

export const addSeedData = functions
  .region(settings.functions.region)
  .pubsub.topic('add-seed-data')
  .onPublish(async () => {
    const itemsPath = `/common/demo-data/items`;
    const categoriesPath = `/common/defaults/categories`;
    const labelsPath = `/common/demo-data/labels`;

    const db = admin.firestore();
    const batch = db.batch();

    const addDeleteBatchItems = async (path: string) => {
      const collectionRef = db.collection(path);
      const query = collectionRef;
      const snapshot = await query.get();
      snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    };

    const addSetBatchItems = (items: Item[] | Label[] | Category[], path: string) => {
      items.forEach((item) => {
        const { id, ...firestoreData } = item;
        const itemRef = db.collection(path).doc(id);
        batch.set(itemRef, firestoreData);
      });
    };

    await addDeleteBatchItems(itemsPath);
    await addDeleteBatchItems(categoriesPath);
    await addDeleteBatchItems(labelsPath);

    addSetBatchItems(seedData.items as Item[], itemsPath);
    addSetBatchItems(seedData.categories as Category[], categoriesPath);
    addSetBatchItems(seedData.labels as Label[], labelsPath);

    try {
      console.log('Started writing seed data to Firestore.');
      await batch.commit();
    } catch (error) {
      throw new Error(`addSeedData: Writing seed data to Firestore failed.\n${error as string}`);
    }

    console.log('addSeedData: Writing seed data to Firestore successful!');
  });
