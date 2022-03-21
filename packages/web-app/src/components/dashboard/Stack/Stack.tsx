import { ReactNode } from 'react';
import { getClassString } from '../../../utils';
import './style.scss';

type StackProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Compound component used to display stacks on the dashboard.
 * Consists of a stack wrapper component and a List subcomponent.
 * Currently used by Inventory and Pack.
 */
export const Stack = ({ children, className }: StackProps) => {
  return (
    // wrapper div is used in order to achieve flexible list height
    <div className={getClassString('stack__wrapper', className)}>
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
