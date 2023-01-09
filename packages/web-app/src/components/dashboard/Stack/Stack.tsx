import './Stack.scss';

import { ReactNode } from 'react';

import { getClassString } from '../../../utils';

type StackProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Compound component used to display stacks on the dashboard.
 * Consists of a Stack wrapper component and a List subcomponent.
 * Currently used for Inventory and Pack.
 */
export const Stack = ({ children, className }: StackProps) => {
  return (
    <div className={getClassString('stack__wrapper', { extraClassNames: className })}>
      <section className="stack">{children}</section>
    </div>
  );
};

type ListProps = {
  children: ReactNode;
  isEmpty?: boolean;
};

const List = ({ children, isEmpty }: ListProps) => {
  const isFirefox = navigator.userAgent.indexOf('Firefox') !== -1;
  const isMacOs = navigator.userAgent.indexOf('Mac') !== -1;

  return (
    <div
      className={
        'stack__list' +
        (isFirefox && isMacOs ? ' stack__list--firefox-mac' : '') +
        (isEmpty ? ' stack__list--empty' : '')
      }
    >
      {children}
    </div>
  );
};

Stack.List = List;
