import './DemoData.scss';

import { useDispatch, useSelector } from 'react-redux';

import { useToggle } from '../../../../hooks';
import { selectDemoItems } from '../../../../state/selectors/itemsSelector';
import { selectDemoDataLabels } from '../../../../state/selectors/labelsSelector';
import { addDemoData } from '../../../../state/slices/demoDataSlice';
import { batchDeleteItems } from '../../../../state/slices/itemsSlice';
import { batchDeleteLabels } from '../../../../state/slices/labelsSlice';
import { RootState } from '../../../../state/store';
import { Button } from '../../controls/Button';
import { CloseButton } from '../../controls/CloseButton';
import { Popover } from '../../misc/Popover';

export const DemoData = () => {
  const uid = useSelector((state: RootState) => state.user.uid);
  const dispatch = useDispatch();
  const demoItems = useSelector((state: RootState) => selectDemoItems(state));
  const demoLabels = useSelector((state: RootState) => selectDemoDataLabels(state));
  // used to enable/disable Load and Remove buttons
  // also accounts for the case when all/some demo items/labels were deleted manually
  const isDemoDataPresent = demoItems.length > 0 && demoLabels.length > 0;
  const isLoading = useSelector((state: RootState) => state.demoData.isLoading);

  const [isLoadPopoverOpen, toggleLoadPopover] = useToggle();
  const [isRemovePopoverOpen, toggleRemovePopover] = useToggle();

  const loadDemoData = () => {
    toggleLoadPopover();
    dispatch(addDemoData(uid));
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
        content={
          <>
            <Popover.Header>
              <Popover.Title>Load demo data?</Popover.Title>
              <CloseButton onClick={toggleLoadPopover} />
            </Popover.Header>
            <Popover.Content>
              <Popover.Text>
                Use this to load demo items and labels. These can be easily removed later.
              </Popover.Text>
              <Button onClick={loadDemoData}>Load</Button>
            </Popover.Content>
          </>
        }
        isOpen={isLoadPopoverOpen}
        onClickOutside={toggleLoadPopover}
        size="large"
      >
        <Button
          className="demo-data__button"
          disabled={isLoading || isDemoDataPresent}
          onClick={toggleLoadPopover}
          variant="underline"
        >
          Load
        </Button>
      </Popover>
      {/*  Remove */}
      <Popover
        content={
          <>
            <Popover.Header>
              <Popover.Title>Remove demo data?</Popover.Title>
              <CloseButton onClick={toggleRemovePopover} />
            </Popover.Header>
            <Popover.Content>
              <Popover.Text>
                All items and labels added as demo data (even if you have made changes to them) will
                be removed. Items and labels you created yourself will not be affected.
              </Popover.Text>
              <Button onClick={removeDemoData} variant="secondary">
                Remove
              </Button>
            </Popover.Content>
          </>
        }
        isOpen={isRemovePopoverOpen}
        onClickOutside={toggleRemovePopover}
        size="large"
      >
        <Button
          className="demo-data__button"
          disabled={!isDemoDataPresent}
          onClick={toggleRemovePopover}
          variant="underline"
        >
          Remove
        </Button>
      </Popover>
    </section>
  );
};
