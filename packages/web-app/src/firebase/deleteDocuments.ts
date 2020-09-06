import db from './firebase';
import processBatchIncrement from './processBatchIncrement';

/**
 * Delete documents from a collection.
 * Uses batching to support deleting more than 500 documents.
 * Does not support recursive deletion (i.e. also does not delete documents in sub-collections).
 * Optionally supports deleting documents that only match a specific query.
 */
export default async (collectionName: string, docIds: string[]) => {
  const collection = db.collection(collectionName);
  let batch = db.batch();

  let i = 0;
  for (const id of docIds) {
    batch.delete(collection.doc(id));
    ({ i, batch } = await processBatchIncrement(i, batch));
  }

  if (i > 0) await batch.commit();
};
