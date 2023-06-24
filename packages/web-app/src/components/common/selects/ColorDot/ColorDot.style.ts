import styles from '../../../../styles/base/_export.scss';

export const colorDotStyle = (color = styles.lightGrey, marginLeft = '2.2rem') => ({
  ':before': {
    backgroundColor: color,
    borderRadius: '1rem',
    content: '" "',
    display: 'block',
    height: '1.2rem',
    marginLeft,
    marginRight: '0.7rem',
    minWidth: '1.2rem',
  },
  alignItems: 'center',
  display: 'flex',
});
