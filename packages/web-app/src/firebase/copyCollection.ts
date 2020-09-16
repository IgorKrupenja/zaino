import db from './firebase';

/**
 * Copy all items in a collection in one path to another.
 * Uses batching to support copying collections that have more than 500 documents.
 * Does not support recursive copying (i.e. does not also copy sub-collections).
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
