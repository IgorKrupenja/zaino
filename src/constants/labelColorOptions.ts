export type LabelColorOption = {
  value: string;
  label: string;
  color: string;
};

// todo might need refactor to use on dashboard
export const labelColorOptions: LabelColorOption[] = [
  { value: 'sky', label: 'Sky', color: '#00BDFE' },
  { value: 'sea', label: 'Sea', color: '#0052CC' },
  { value: 'sunset', label: 'Sunset', color: '#FF5630' },
  { value: 'autumn', label: 'Autumn', color: '#F89228' },
  { value: 'beach', label: 'Beach', color: '#ECB500' },
  { value: 'flower', label: 'Flower', color: '#DE67B6' },
  { value: 'grass', label: 'Grass', color: '#5DBF08' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'mountain', label: 'Mountain', color: '#7C4A35' },
  { value: 'storm', label: 'Storm', color: '#253858' },
  { value: 'winter', label: 'Winter', color: '#666666' },
];
