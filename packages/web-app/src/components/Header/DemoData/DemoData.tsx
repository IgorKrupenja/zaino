import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Popover from 'react-tiny-popover';
import copyCollection from '../../../firebase/copyCollection';
import useToggle from '../../../hooks/useToggle';
import { selectDemoItems } from '../../../state/selectors/items';
import { selectDemoLabels } from '../../../state/selectors/labels';
import { loadDemoData, setIsLoading } from '../../../state/slices/dataLoader';
import { batchDeleteItems } from '../../../state/slices/items';
import { batchDeleteLabels } from '../../../state/slices/labels';
import { RootState } from '../../../state/store';
import { Button } from '../../misc/Button';
import { CloseButton } from '../../misc/CloseButton';
import { Popover } from '../../misc/Popover';
import { PopoverHeader } from '../../misc/PopoverHeader';
import './style.scss';

export const DemoData = () => {
  const uid = useSelector((state: RootState) => state.auth.uid);
  const dispatch = useDispatch();
  const demoItems = useSelector((state: RootState) => selectDemoItems(state));
  const demoLabels = useSelector((state: RootState) => selectDemoLabels(state));
  // used to enable/disable Load and Remove buttons
  // also accounts for the case when all/some demo items/labels were deleted manually
  const isDemoDataPresent = demoItems.length > 0 && demoLabels.length > 0;
  const isLoading = useSelector((state: RootState) => state.dataLoader.isLoading);

  const prepareDemoData = async () => {
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
  };

  const removeDemoData = () => {
    dispatch(batchDeleteItems(demoItems));
    dispatch(batchDeleteLabels(demoLabels));
  };

  const [isLoadPopoverOpen, toggleLoadPopover] = useToggle();
  const [isRemovePopoverOpen, toggleRemovePopover] = useToggle();

  return (
    <section>
      Demo data
      {/* Load */}
      <Popover
        isOpen={isLoadPopoverOpen}
        onClickOutside={toggleLoadPopover}
        content={
          <>
            <PopoverHeader text="Load demo data?">
              <CloseButton onClick={toggleLoadPopover} />
            </PopoverHeader>
            <p>Use this to load demo items and labels. These can be easily removed later.</p>
            <Button
              // disabled={isLoading || isDemoDataPresent}
              onClick={async () => {
                toggleLoadPopover();
                await prepareDemoData();
              }}
            >
              Load
            </Button>
          </>
        }
      >
        <Button disabled={isLoading || isDemoDataPresent} onClick={toggleLoadPopover}>
          {/* Load button is disabled while data is present or is being loaded */}
          Load
        </Button>
      </Popover>
      {/* todo Remove */}
      <button disabled={!isDemoDataPresent} onClick={removeDemoData}>
        Remove
      </button>
    </section>
  );
};
