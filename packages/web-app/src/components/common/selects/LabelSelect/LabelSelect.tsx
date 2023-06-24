import { Label } from '@zaino/shared';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OnChangeValue } from 'react-select';
import { PopoverAlign } from 'react-tiny-popover';
import { v4 as uuid } from 'uuid';

import { colors } from '../../../../constants';
import { addLabel } from '../../../../state/slices/labelsSlice';
import { RootState } from '../../../../state/store';
import { getRandomColor, sortSelectOptionsByName } from '../../../../utils';
import { SelectOption, SelectPopover } from '../SelectPopover';
import { labelSelectStyles } from './LabelSelect.style';

type LabelSelectProps = {
  children: ReactNode;
  headerText: string;
  isCreatable?: boolean;
  labelIds?: string[];
  onChange: (labelIds: string[]) => void;
  popoverAlign?: PopoverAlign;
};

export const LabelSelect = ({ labelIds, onChange, children, ...rest }: LabelSelectProps) => {
  const dispatch = useDispatch();

  // Labels and prepareOptions need to be separate to prevent exceeding max depth with ItemForm
  const labels = useSelector((state: RootState) => state.labels);
  const prepareOptions = (labels: Label[]) =>
    labels
      .map((label) => ({
        hexValue: colors.find((color) => color.name === label.colorName)?.hexValue,
        label: label.name,
        value: label.id,
      }))
      .sort(sortSelectOptionsByName);
  const [options, setOptions] = useState(prepareOptions(labels));

  // Prepare select values based on passed selected labelIds
  const prepareValues = useCallback(
    (labelIds: string[] | undefined) => {
      return labelIds ? options.filter((label) => labelIds.includes(label.value)) : [];
    },
    [options]
  );
  const [values, setValues] = useState(prepareValues(labelIds));

  // Update selected labels when clicking on a label inside ItemDetails
  useEffect(() => setValues(prepareValues(labelIds)), [labelIds, prepareValues]);
  // Update labels in DashboardFilters select when new ones are created in ItemForm
  useEffect(() => setOptions(prepareOptions(labels)), [labels]);

  const handleChange = (newValues: OnChangeValue<SelectOption, boolean>) => {
    const newValueArray = newValues as SelectOption[] | null;
    const labelIds = newValueArray ? newValueArray.map((label) => label.value) : [];
    onChange(labelIds);
  };

  const handleCreate = (inputValue: string): void => {
    const id = uuid();
    const color = getRandomColor();
    dispatch(
      addLabel({
        colorName: color.name,
        id,
        itemTotalCount: 0,
        itemUniqueCount: 0,
        lastSortIndex: 0,
        name: inputValue,
      })
    );

    const newOption = {
      hexValue: color.hexValue,
      label: inputValue,
      value: id,
    };
    setOptions([...options, newOption]);

    handleChange(values ? [...values, newOption] : [newOption]);
  };

  return (
    <SelectPopover
      formatCreateLabel={(inputValue: string) => `Create label "${inputValue}"`}
      isMulti={true}
      onChange={handleChange}
      onCreateOption={handleCreate}
      options={options}
      styles={labelSelectStyles}
      value={values}
      {...rest}
      noOptionsMessage={() => `No${options.length > 0 ? ' matching' : ''} labels`}
    >
      {children}
    </SelectPopover>
  );
};
