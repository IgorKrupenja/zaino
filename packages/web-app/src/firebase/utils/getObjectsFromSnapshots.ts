import type firebase from 'firebase/compat';

export const getObjectsFromSnapshots = (
  snapshots: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>[]
) => {
  return snapshots.map((collection) =>
    collection.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  );
};
