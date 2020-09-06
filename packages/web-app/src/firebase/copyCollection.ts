import db from './firebase';
import processBatchIncrement from './processBatchIncrement';

/**
 * Copy all items in a collection in one path to another.
 * Uses batching to support copying collections that have more than 500 documents.
 * Does not support recursive copying (i.e. also does not copy sub-collections).
 * Optionally supports setting date field.
 */
export default async (srcCollectionPath: string, destCollectionPath: string, addedAt?: string) => {
  // set single timestamp for all copied documents
  const srcCollection = db.collection(srcCollectionPath);
  const documents = await srcCollection.get();
  let batch = db.batch();
  const destCollection = db.collection(destCollectionPath);

  let i = 0;
  for (const doc of documents.docs) {
    const data = addedAt ? { ...doc.data(), addedAt } : doc.data();
    batch.set(destCollection.doc(doc.id), data);
    ({ i, batch } = await processBatchIncrement(i, batch));
  }

  if (i > 0) await batch.commit();
};
