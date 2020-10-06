import React from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { firebase } from '../../../firebase/firebase';
import useToggle from '../../../hooks/useToggle';
import { resetItemsState } from '../../../state/slices/items';
import { resetLabelsState } from '../../../state/slices/labels';
import { logout } from '../../../state/slices/user';
import { RootState } from '../../../state/store';
import { Button } from '../../Controls/Button';
import { CloseButton } from '../../Controls/CloseButton';
import { Popover } from '../../Misc/Popover';
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
      containerClassName="popover--wide"
      align="end"
      content={
        <>
          <Popover.Header>
            <Popover.Title>Account</Popover.Title>
            <CloseButton onClick={togglePopover} />
          </Popover.Header>
          <Popover.Content>
            <img src={photoUrl} className="account-details__photo" />
            <div className="account-details__info">
              <div className="account-details__name">{name}</div>
              <div className="account-details__email">{email}</div>
            </div>
          </Popover.Content>
          <Button className="button--grey account-details__sign-out" onClick={handleLogout}>
            Sign out
          </Button>
        </>
      }
    >
      <img
        src={photoUrl}
        onClick={togglePopover}
        className="account-details__photo account-details__photo--toggle"
      />
    </Popover>
  );
};
