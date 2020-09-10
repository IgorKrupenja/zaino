import cssSettings from '../../../styles/common/_settings.scss';

export const defaultContainerStyle: Partial<CSSStyleDeclaration> = {
  boxShadow: `0 0 0 0.1rem ${cssSettings.shadow}, 0 0.4rem 1.1rem ${cssSettings.shadow}`,
  backgroundColor: 'white',
  borderRadius: cssSettings.xsSize,
};
