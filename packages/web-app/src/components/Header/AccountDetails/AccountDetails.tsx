import React from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { firebase } from '../../../firebase/firebase';
import useToggle from '../../../hooks/useToggle';
import { resetItemsState } from '../../../state/slices/items';
import { resetLabelsState } from '../../../state/slices/labels';
import { logout } from '../../../state/slices/user';
import { RootState } from '../../../state/store';
import { Button } from '../../misc/Button';
import { CloseButton } from '../../misc/CloseButton';
import { Popover } from '../../Popover/Popover';
import { PopoverContent } from '../../Popover/PopoverContent';
import { PopoverHeader } from '../../Popover/PopoverHeader';
import './style.scss';

export const AccountDetails = () => {
  const { name, email, photoUrl } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    // logging out here as doing so in a createAsyncThunk leads to an error:
    // "Can't perform a React state update on an unmounted component."
    // todo see #298
    await firebase.auth().signOut();
    batch(() => {
      dispatch(logout());
      dispatch(resetItemsState());
      dispatch(resetLabelsState());
    });
  };

  const [isPopoverOpen, togglePopover] = useToggle();

  return (
    <Popover
      isOpen={isPopoverOpen}
      onClickOutside={togglePopover}
      containerClassName="popover-container--wide"
      align="end"
      content={
        <>
          <PopoverHeader text="Account">
            <CloseButton className="close-button--large-margin" onClick={togglePopover} />
          </PopoverHeader>
          <PopoverContent>
            <img src={photoUrl} className="account-details__photo" />
            <div className="account-details__info">
              <div className="account-details__name">{name}</div>
              <div className="account-details__email">{email}</div>
            </div>
          </PopoverContent>
          <Button className="button--wide button--grey" onClick={handleLogout}>
            Sign out
          </Button>
        </>
      }
    >
      <div className="account-details">
        <img
          src={photoUrl}
          onClick={togglePopover}
          className="account-details__photo account-details__photo--toggle"
        />
      </div>
    </Popover>
  );
};
