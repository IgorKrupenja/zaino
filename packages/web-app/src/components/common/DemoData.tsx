import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import copyCollection from '../../firebase/copyCollection';
import { selectDemoItems } from '../../state/selectors/items';
import { selectDemoLabels } from '../../state/selectors/labels';
import { loadDemoData, setIsLoading } from '../../state/slices/dataLoader';
import { batchDeleteItems } from '../../state/slices/items';
import { batchDeleteLabels } from '../../state/slices/labels';
import { RootState } from '../../state/store';

const DemoData = () => {
  const uid = useSelector((state: RootState) => state.auth.uid);
  const dispatch = useDispatch();
  const demoItems = useSelector((state: RootState) => selectDemoItems(state));
  const demoLabels = useSelector((state: RootState) => selectDemoLabels(state));
  // used to enable/disable Load and Remove buttons
  // also accounts for the case when all/some demo items/labels were deleted manually
  const isDemoDataPresent = demoItems.length > 0 && demoLabels.length > 0;
  const isLoading = useSelector((state: RootState) => state.dataLoader.isLoading);

  return (
    <section>
      Demo data
      {/* Load */}
      <button
        // also disable Load button while data is being loaded
        disabled={isLoading || isDemoDataPresent}
        onClick={async () => {
          const t0 = performance.now();
          dispatch(setIsLoading(true));
          const addedAt = new Date().toISOString();

          await Promise.all([
            // copy demo items/labels to user's collections
            // date argument to set single timestamp
            // for all copied demo data items for sorting purposes
            copyCollection('common/demo-data/items', `users/${uid}/items`, addedAt),
            copyCollection('common/demo-data/labels', `users/${uid}/labels`),
          ]);

          dispatch(loadDemoData(uid));
          console.log(performance.now() - t0);
        }}
      >
        Load
      </button>
      {/* Remove */}
      <button
        disabled={!isDemoDataPresent}
        onClick={() => {
          dispatch(batchDeleteItems(demoItems));
          dispatch(batchDeleteLabels(demoLabels));
        }}
      >
        Remove
      </button>
    </section>
  );
};

export default DemoData;
