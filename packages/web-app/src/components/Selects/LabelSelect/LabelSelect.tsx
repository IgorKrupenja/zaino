import { Colors, getRandomColor, Label } from '@zaino/shared';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ValueType } from 'react-select';
import { v4 as uuid } from 'uuid';
import useToggle from '../../../hooks/useToggle';
import { addLabel } from '../../../state/slices/labels';
import { RootState } from '../../../state/store';
import { CloseButton } from '../../misc/CloseButton';
import { Popover } from '../../misc/Popover';
import { PopoverHeading } from '../../misc/PopoverHeading';
import { Select } from '../Select';
import LabelSelectStyles from './style';

export type LabelSelectOption = {
  value: string;
  label: string;
};

type LabelSelectProps = {
  labelIds?: string[];
  onChange: (labelIds: string[]) => void;
  isCreatable?: boolean;
};

export const LabelSelect = ({ labelIds, onChange, isCreatable }: LabelSelectProps) => {
  const dispatch = useDispatch();
  // labels and prepareOptions need to be separate to prevent exceeding max depth with ItemForm
  const labels = useSelector((state: RootState) => state.labels);
  const prepareOptions = (labels: Label[]) =>
    labels
      .map(label => ({
        value: label.id,
        label: label.name,
        hexValue: Colors.find(color => color.name === label.colorName)?.hexValue,
      }))
      .sort((a, b) => (a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1));
  const [options, setOptions] = useState(prepareOptions(labels));
  // prepare select values based on passed selected labelIds
  // had to use useCallback to prevent prepareValues running on every re-render
  // as prepareValues is a dependency of an useEffect hook below
  const prepareValues = useCallback(
    (labelIds: string[] | undefined) => {
      return labelIds ? options.filter(label => labelIds.includes(label.value)) : [];
    },
    [options]
  );
  const [values, setValues] = useState<ValueType<LabelSelectOption>>(prepareValues(labelIds));

  // display filtered label when set by clicking on label/category inside ItemDetails
  useEffect(() => setValues(prepareValues(labelIds)), [prepareValues, labelIds]);
  // update options in DashboardFilters when new ones are created in ItemForm
  useEffect(() => setOptions(prepareOptions(labels)), [labels]);

  const handleChange = (newValues: ValueType<LabelSelectOption>) => {
    !isCreatable && togglePopover();
    setValues(newValues);
    const valueArray = newValues as LabelSelectOption[];
    // turn values into labelIds
    const labelIds: string[] = valueArray ? valueArray.map(label => label.value) : [];
    onChange(labelIds);
  };

  const handleCreate = (inputValue: string) => {
    const id = uuid();
    const color = getRandomColor();
    dispatch(
      addLabel({
        id,
        name: inputValue,
        colorName: color.name,
        itemUniqueCount: 0,
        itemTotalCount: 0,
      })
    );

    const newOption = {
      label: inputValue,
      value: id,
      hexValue: color.hexValue,
    };
    setOptions([...options, newOption]);

    const valueArray = values as LabelSelectOption[];
    handleChange(valueArray ? [...valueArray, newOption] : [newOption]);
  };

  const selectProps = {
    isMulti: true,
    styles: LabelSelectStyles,
    placeholder: 'Search labels',
    onChange: handleChange,
    onCreateOption: handleCreate,
    options,
    value: values,
    isCreatable,
    noOptionsMessage: () => 'No matching labels',
  };

  const [isPopoverOpen, togglePopover] = useToggle();

  return (
    <Popover
      isOpen={isPopoverOpen}
      onClickOutside={togglePopover} // handle click events outside of the popover/target here!
      content={
        <>
          <PopoverHeading text="Filter by label">
            <CloseButton onClick={togglePopover} />
          </PopoverHeading>
          <Select {...selectProps} />
        </>
      }
    >
      <button type="button" onClick={togglePopover}>
        Labels
      </button>
    </Popover>
  );
};
