import { useEffect, useState } from 'react';
import './style.scss';

export const Loader = () => {
  const [isShown, setIsShown] = useState(false);

  // Shows loader only after slight delay to prevent flicker
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      setIsShown(true);
    }, 100);
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return isShown ? (
    <div className="loader-container">
      <div className="loader" />
    </div>
  ) : (
    <></>
  );
};
