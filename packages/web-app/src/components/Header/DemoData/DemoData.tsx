import { useDispatch, useSelector } from 'react-redux';
import useToggle from '../../../hooks/useToggle';
import { selectDemoItems } from '../../../state/selectors/items';
import { selectDemoDataLabels } from '../../../state/selectors/labels';
import { addDemoData } from '../../../state/slices/dataLoader';
import { batchDeleteItems } from '../../../state/slices/itemsSlice';
import { batchDeleteLabels } from '../../../state/slices/labelsSlice';
import { RootState } from '../../../state/store';
import { Button } from '../../Common/Controls/Button';
import { CloseButton } from '../../Common/Controls/CloseButton';
import { Popover } from '../../Common/Misc/Popover';
import './style.scss';

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
    // dispatch(setIsLoading(true));
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
        isOpen={isLoadPopoverOpen}
        onClickOutside={toggleLoadPopover}
        className="popover--wide"
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
              <Button className="button--green" onClick={loadDemoData}>
                Load
              </Button>
            </Popover.Content>
          </>
        }
      >
        <Button
          className="button--underline"
          // Load button is disabled while data is present or is being loaded
          disabled={isLoading || isDemoDataPresent}
          onClick={toggleLoadPopover}
        >
          Load
        </Button>
      </Popover>
      {/*  Remove */}
      <Popover
        isOpen={isRemovePopoverOpen}
        onClickOutside={toggleRemovePopover}
        className="popover--wide"
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
              <Button className="button--red" onClick={removeDemoData}>
                Remove
              </Button>
            </Popover.Content>
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
