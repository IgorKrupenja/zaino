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
import { Button } from '../../Controls/Button';
import { CloseButton } from '../../Controls/CloseButton';
import { Popover } from '../../Popover/Popover';
import { PopoverContent } from '../../Popover/PopoverContent';
import { PopoverHeader } from '../../Popover/PopoverHeader';
import './style.scss';

export const DemoData = () => {
  const uid = useSelector((state: RootState) => state.user.uid);
  const dispatch = useDispatch();
  const demoItems = useSelector((state: RootState) => selectDemoItems(state));
  const demoLabels = useSelector((state: RootState) => selectDemoLabels(state));
  // used to enable/disable Load and Remove buttons
  // also accounts for the case when all/some demo items/labels were deleted manually
  const isDemoDataPresent = demoItems.length > 0 && demoLabels.length > 0;
  const isLoading = useSelector((state: RootState) => state.dataLoader.isLoading);

  const [isLoadPopoverOpen, toggleLoadPopover] = useToggle();
  const [isRemovePopoverOpen, toggleRemovePopover] = useToggle();

  const handleDemoDataLoad = async () => {
    dispatch(setIsLoading(true));
    toggleLoadPopover();
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
    toggleRemovePopover();
    dispatch(batchDeleteItems(demoItems));
    dispatch(batchDeleteLabels(demoLabels));
  };

  return (
    <section className="demo-data">
      <div className="demo-data__title">Demo data</div>
      {/* Load */}
      <Popover
        isOpen={isLoadPopoverOpen}
        onClickOutside={toggleLoadPopover}
        containerClassName="popover-container--wide"
        content={
          <>
            <PopoverHeader text="Load demo data?">
              <CloseButton className="close-button--large-padding" onClick={toggleLoadPopover} />
            </PopoverHeader>
            <PopoverContent>
              Use this to load demo items and labels. These can be easily removed later.
            </PopoverContent>
            <Button className="button--green button--wide" onClick={handleDemoDataLoad}>
              Load
            </Button>
          </>
        }
      >
        <Button
          className="button--underline"
          disabled={isLoading || isDemoDataPresent}
          onClick={toggleLoadPopover}
        >
          {/* Load button is disabled while data is present or is being loaded */}
          Load
        </Button>
      </Popover>
      {/*  Remove */}
      <Popover
        isOpen={isRemovePopoverOpen}
        onClickOutside={toggleRemovePopover}
        containerClassName="popover-container--wide"
        content={
          <>
            <PopoverHeader text="Remove demo data?">
              <CloseButton onClick={toggleRemovePopover} />
            </PopoverHeader>
            <PopoverContent>
              All items and labels added as demo data (even if you have made changes to them) will
              be removed. Items and labels you created yourself will not be affected.
            </PopoverContent>
            <Button className="button--red button--wide" onClick={removeDemoData}>
              Remove
            </Button>
          </>
        }
      >
        <Button
          className="button--underline"
          disabled={!isDemoDataPresent}
          onClick={toggleRemovePopover}
        >
          Remove
        </Button>
      </Popover>
    </section>
  );
};
