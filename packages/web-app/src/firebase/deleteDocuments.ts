import db from './firebase';

/**
 * Delete documents from a collection.
 * Uses batching to support deleting more than 500 documents.
 * Does not support recursive deletion (i.e. does not also delete documents in sub-collections).
 * Optionally supports deleting documents that only match a specific query.
 */
export default async (collectionName: string, docIds: string[]) => {
  const collection = db.collection(collectionName);
  let batch = db.batch();

  let i = 0;
  for (const id of docIds) {
    batch.delete(collection.doc(id));
    i++;
    // Firestore only allows 500 batch operations in a single batch.
    if (i > 490) {
      i = 0;
      await batch.commit();
      batch = db.batch();
    }
  }

  if (i > 0) await batch.commit();
};
