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
import { labelSelectStyles } from './style';

type LabelSelectProps = {
  labelIds?: string[];
  onChange: (labelIds: string[]) => void;
  isCreatable?: boolean;
  headerText: string;
  popoverAlign?: PopoverAlign;
  children: ReactNode;
};

/**
 * Label select. Used in both ItemForm and DashboardFilters.
 */
export const LabelSelect = ({ labelIds, onChange, children, ...rest }: LabelSelectProps) => {
  const dispatch = useDispatch();

  // labels and prepareOptions need to be separate to prevent exceeding max depth with ItemForm
  const labels = useSelector((state: RootState) => state.labels);
  const prepareOptions = (labels: Label[]) =>
    labels
      .map((label) => ({
        value: label.id,
        label: label.name,
        hexValue: colors.find((color) => color.name === label.colorName)?.hexValue,
      }))
      .sort(sortSelectOptionsByName);
  const [options, setOptions] = useState(prepareOptions(labels));

  // prepare select values based on passed selected labelIds
  // had to use useCallback to prevent prepareValues running on every re-render
  // (as prepareValues is a dependency of an useEffect hook below)
  const prepareValues = useCallback(
    (labelIds: string[] | undefined) => {
      return labelIds ? options.filter((label) => labelIds.includes(label.value)) : [];
    },
    [options]
  );
  const [values, setValues] = useState(prepareValues(labelIds));

  // update selected labels when clicking on a label inside ItemDetails
  useEffect(() => setValues(prepareValues(labelIds)), [labelIds, prepareValues]);
  // update labels in DashboardFilters select when new ones are created in ItemForm
  useEffect(() => {
    setOptions(prepareOptions(labels));
  }, [labels]);

  const handleChange = (newValues: OnChangeValue<SelectOption, boolean>) => {
    const newValueArray = newValues as SelectOption[];
    // turn values into labelIds
    const labelIds = newValueArray ? newValueArray.map((label) => label.value) : [];
    onChange(labelIds);
  };

  const handleCreate = (inputValue: string): void => {
    const id = uuid();
    const color = getRandomColor();
    dispatch(
      addLabel({
        id,
        name: inputValue,
        colorName: color.name,
        itemUniqueCount: 0,
        itemTotalCount: 0,
        lastSortIndex: 0,
      })
    );

    const newOption = {
      label: inputValue,
      value: id,
      hexValue: color.hexValue,
    };
    setOptions([...options, newOption]);

    handleChange(values ? [...values, newOption] : [newOption]);
  };

  return (
    <SelectPopover
      formatCreateLabel={(inputValue: string) => `Create label "${inputValue}"`}
      isMulti={true}
      styles={labelSelectStyles}
      onChange={handleChange}
      onCreateOption={handleCreate}
      options={options}
      value={values}
      {...rest}
      noOptionsMessage={() => `No${options.length > 0 ? ' matching' : ''} labels`}
    >
      {children}
    </SelectPopover>
  );
};
