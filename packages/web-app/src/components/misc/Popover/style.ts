import cssSettings from '../../../styles/common/_settings.scss';

const shadow = 'hsla(218, 50%, 10%, 0.1)';

export const defaultContainerStyle: Partial<CSSStyleDeclaration> = {
  overflow: 'unset',
  boxShadow: `0 0 0 0.1rem ${shadow}, 0 0.4rem 1.1rem ${shadow}`,
  // fix for select overflow issues
  paddingBottom: '0.3rem',
  backgroundColor: 'white',
  borderRadius: cssSettings.xsSize,
};
