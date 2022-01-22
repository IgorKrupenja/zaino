// function deployment fails if using synthetic import here
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
// firebase-tools do not have type definitions
// @ts-ignore
import * as tools from 'firebase-tools';
import functionsRegion from './utils/functionsRegion';

/**
 * IMPORTANT: This function was only used for a one-off migration to DB schema with categories.
 * It should not be used anymore but is left here for reference.
 */
export const refactorCategories = functions
  .region(functionsRegion)
  .pubsub.topic('refactor-categories')
  .onPublish(async () => {
    const defaultsRoot = '/common/defaults/categories';

    // delete previously added categories
    await tools.firestore.delete(defaultsRoot, {
      project: process.env.GCLOUD_PROJECT,
      recursive: true,
      yes: true,
    });

    const db = admin.firestore();
    let batch = db.batch();
    const users = await db.collection('/users').get();

    categories.forEach(category => {
      const { id, ...firestoreData } = category;
      // add default categories
      batch.set(db.collection(defaultsRoot).doc(id), firestoreData);
      // copy categories over to each user
      for (const user of users.docs) {
        batch.set(user.ref.collection('categories').doc(id), firestoreData);
      }
    });

    try {
      console.log('Started writing categories to Firestore.');
      await batch.commit();
    } catch (error) {
      throw new Error(
        `refactorCategories: Writing demo data to Firestore failed.\n${error as string}`
      );
    }

    // update user items with new category data
    batch = db.batch();
    let i = 0;
    for (const user of users.docs) {
      const items = await user.ref.collection('items').get();
      for (const item of items.docs) {
        updateItem(item, batch);

        i++;
        if (i > 490) {
          i = 0;
          await batch.commit();
          batch = db.batch();
        }
      }
    }

    if (i > 0) {
      await batch.commit();
      batch = db.batch();
    }

    // update demo data items
    const demoItems = await db.collection('/common/demo-data/items').get();
    for (const item of demoItems.docs) {
      updateItem(item, batch);
    }

    try {
      console.log('Started committing demo data updates to Firestore.');
      await batch.commit();
    } catch (error) {
      throw new Error(
        `refactorCategories: Updating demo data in Firestore failed.\n${error as string}`
      );
    }

    console.log('refactorCategories: Updating categories in Firestore successful!');
  });

const updateItem = (
  item: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>,
  batch: FirebaseFirestore.WriteBatch
) => {
  const categoryName = item.data().categoryName as string | null;
  if (categoryName) {
    if (categoryName === 'Clothing: head & eyewear') {
      batch.update(item.ref, {
        categoryName: admin.firestore.FieldValue.delete(),
        categoryId: 'b4e6acb0-9706-49c9-8a91-40aad2ca8a92',
      });
    } else {
      const categoryId = categories.find(cat => cat.name == categoryName)?.id;
      batch.update(item.ref, { categoryName: admin.firestore.FieldValue.delete(), categoryId });
    }
  }
};

const categories = [
  {
    name: 'Clothing: top',
    imageFileName: 'jacket.svg',
    id: 'a6a97ef9-3ad8-490a-852d-3fe44af3c90c',
    isDefault: true,
  },
  {
    name: 'Clothing: legs',
    imageFileName: 'shorts.svg',
    id: '8df47a80-03f8-4fc5-94e0-3085a95238a9',
  },
  {
    name: 'Clothing: gloves',
    imageFileName: 'gloves.svg',
    id: 'df9ba045-e7bc-4963-806d-5f51c931de86',
  },
  {
    name: 'Clothing: head',
    imageFileName: 'hat.svg',
    id: 'b4e6acb0-9706-49c9-8a91-40aad2ca8a92',
  },
  {
    name: 'Clothing: socks',
    imageFileName: 'socks.svg',
    id: '90b69496-3252-42df-aaae-8fd840c8ce87',
  },
  {
    name: 'Footwear',
    imageFileName: 'boots.svg',
    id: '87af3c64-d042-415a-bb98-c5dc413e4dd6',
  },
  {
    name: 'Backpacks & bags',
    imageFileName: 'backpack.svg',
    id: 'a48fe3a6-c6bf-4643-b21f-dbdfb899308a',
  },
  {
    name: 'Hiking poles',
    imageFileName: 'poles.svg',
    id: '3db35a64-da6e-4429-b4de-6cb203f1886b',
  },
  {
    name: 'Climbing',
    imageFileName: 'pickaxe.svg',
    id: 'c1e94cf1-fe53-4576-8d05-92c868a9254f',
  },
  {
    name: 'Tents & sleeping',
    imageFileName: 'tent.svg',
    id: '51a3e5dd-bb96-4243-a171-190b3a75500d',
  },
  {
    name: 'Kitchen & nutrition',
    imageFileName: 'stove.svg',
    id: '0ea4c94d-7c47-46fd-b2b7-b741757c59c5',
  },
  {
    name: 'Fishing & hunting',
    imageFileName: 'hook.svg',
    id: '01f23d8f-8116-48f4-b89f-3b60acd6e503',
  },
  {
    name: 'Navigation',
    imageFileName: 'compass.svg',
    id: '20d929f7-eb25-4892-b55e-3e4786b8529f',
  },
  {
    name: 'Electronics',
    imageFileName: 'gps.svg',
    id: '8bf6a997-ffb1-483d-aa50-364feb83bd73',
  },
  {
    name: 'Miscellaneous',
    imageFileName: 'knife.svg',
    id: '1343f0e3-a79a-4a5f-91e5-a4632c353fb0',
  },
];
