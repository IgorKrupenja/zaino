import { useState } from 'react';

export default (): [boolean, () => void] => {
  const [isActive, setIsActive] = useState(false);
  const toggle = () => setIsActive(!isActive);
  return [isActive, toggle];
};
