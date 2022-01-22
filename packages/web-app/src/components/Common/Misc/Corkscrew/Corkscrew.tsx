import React from 'react';
import styles from '../../../../styles/base/_export.scss';

/**
 * A small easter egg and a homage to Dmitri who provided me with the demo data. ;)
 */
export const Corkscrew = () => {
  return (
    <>
      <span style={{ color: styles.red }}>C</span>
      <span style={{ color: styles.blue }}>O</span>
      <span style={{ color: styles.green }}>R</span>
      <span style={{ color: styles.yellow }}>K</span>
      <span style={{ color: styles.purple }}>S</span>
      <span style={{ color: styles.orange }}>C</span>
      <span style={{ color: styles.darkBlue }}>R</span>
      <span style={{ color: styles.brown }}>E</span>
      <span style={{ color: styles.lightBlue }}>W</span>
    </>
  );
};
