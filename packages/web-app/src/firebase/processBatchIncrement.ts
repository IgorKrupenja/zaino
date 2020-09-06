import db from './firebase';

/**
 * Firestore only allows 500 batch operations in a single batch.
 * To workaround this limitation, it is necessary to implement a counter i.
 * This function increments the counter, checks if it approaches 500, commits to Firestore
 * if necessary and then creates a new batch.
 *
 */
export default async (i: number, batch: firebase.firestore.WriteBatch) => {
  i++;
  if (i > 490) {
    i = 0;
    await batch.commit();
    batch = db.batch();
  }
  return { i, batch };
};
