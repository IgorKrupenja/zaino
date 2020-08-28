export type LabelColorOption = {
  value: string;
  label: string;
  hexValue: string;
  // needed for styling background for 'Create label' in LabelSelect
  __isNew__?: boolean;
};

const LabelColorOptions: LabelColorOption[] = [
  { value: 'sky', label: 'Sky', hexValue: '#00BDFE' },
  { value: 'sea', label: 'Sea', hexValue: '#0052CC' },
  { value: 'sunset', label: 'Sunset', hexValue: '#FF5630' },
  { value: 'autumn', label: 'Autumn', hexValue: '#F89228' },
  { value: 'beach', label: 'Beach', hexValue: '#ECB500' },
  { value: 'flower', label: 'Flower', hexValue: '#DE67B6' },
  { value: 'grass', label: 'Grass', hexValue: '#5DBF08' },
  { value: 'forest', label: 'Forest', hexValue: '#00875A' },
  { value: 'mountain', label: 'Mountain', hexValue: '#7C4A35' },
  { value: 'storm', label: 'Storm', hexValue: '#253858' },
  { value: 'winter', label: 'Winter', hexValue: '#666666' },
];

export default LabelColorOptions;
