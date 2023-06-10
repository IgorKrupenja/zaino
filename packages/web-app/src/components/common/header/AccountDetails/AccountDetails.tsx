import './AccountDetails.scss';

import { getAuth, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useToggle } from '../../../../hooks';
import { RootState } from '../../../../state/store';
import { Button } from '../../controls/Button';
import { CloseButton } from '../../controls/CloseButton';
import { Popover } from '../../misc/Popover';

export const AccountDetails = () => {
  const { name, email, photoUrl } = useSelector((state: RootState) => state.user);
  const [isPopoverOpen, togglePopover] = useToggle();

  // Clean up function to cancel async tasks to prevent error on Link click
  useEffect(() => () => {}, []);

  return (
    <Popover
      align="end"
      content={
        <>
          <Popover.Header>
            <Popover.Title>Account</Popover.Title>
            <CloseButton onClick={togglePopover} />
          </Popover.Header>
          <Popover.Content className="account-details__content">
            <img alt={name} className="account-details__photo" src={photoUrl} />
            <div className="account-details__name">{name}</div>
            <div className="account-details__email">{email}</div>
            <Link className="account-details__policies" to="/privacy">
              Privacy and cookie policy
            </Link>
            <Button
              className="account-details__sign-out"
              onClick={async () => signOut(getAuth())}
              variant="tertiary"
            >
              Sign out
            </Button>
          </Popover.Content>
        </>
      }
      isOpen={isPopoverOpen}
      onClickOutside={togglePopover}
      size="large"
    >
      <img
        alt={name}
        className="account-details__photo account-details__photo--toggle"
        onClick={togglePopover}
        src={photoUrl}
      />
    </Popover>
  );
};
