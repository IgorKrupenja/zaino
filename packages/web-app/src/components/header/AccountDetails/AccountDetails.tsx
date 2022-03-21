import { getAuth, signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useToggle } from '../../../hooks';
import { RootState } from '../../../state/store';
import { Button } from '../../common/Controls/Button';
import { CloseButton } from '../../common/Controls/CloseButton';
import { Popover } from '../../common/Misc/Popover';
import './style.scss';

export const AccountDetails = () => {
  const { name, email, photoUrl } = useSelector((state: RootState) => state.user);
  const [isPopoverOpen, togglePopover] = useToggle();

  return (
    <Popover
      isOpen={isPopoverOpen}
      onClickOutside={togglePopover}
      className="popover--wide"
      align="end"
      content={
        <>
          <Popover.Header>
            <Popover.Title>Account</Popover.Title>
            <CloseButton onClick={togglePopover} />
          </Popover.Header>
          <Popover.Content className="account-details__content">
            <img src={photoUrl} className="account-details__photo" alt={name} />
            <div className="account-details__name">{name}</div>
            <div className="account-details__email">{email}</div>
            {/* render policy link if enabled in .env */}
            <Link className="account-details__policies" to="/privacy">
              Privacy and cookie policy
            </Link>
            <Button
              className="button--grey account-details__sign-out"
              onClick={() => signOut(getAuth())}
            >
              Sign out
            </Button>
          </Popover.Content>
        </>
      }
    >
      <img
        src={photoUrl}
        onClick={togglePopover}
        className="account-details__photo account-details__photo--toggle"
        alt={name}
      />
    </Popover>
  );
};
