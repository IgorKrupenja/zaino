import './ItemForm.scss';

import { Item } from '@zaino/shared';
import { ChangeEvent, FormEvent, ReactNode, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { decrementItemCount, incrementItemCount } from '../../../state/slices/labelsSlice';
import { getArrayDifference } from '../../../utils';
import { Column } from '../../common/containers/Column';
import { ExpandingInput } from '../../common/controls/ExpandingInput';
import { FormError } from '../../common/controls/FormError';
import { FormLabel } from '../../common/controls/FormLabel';
import { Input } from '../../common/controls/Input';
import { TextArea } from '../../common/controls/TextArea';
import { CategoryPicker } from '../CategoryPicker';
import { LabelPicker } from '../LabelPicker';

type ItemFormProps = {
  item: Item;
  onSubmit: (item: Item) => void;
  setTitle?: (title: string) => void;
  children: ReactNode;
};

export const ItemForm = ({ item, onSubmit, setTitle, children }: ItemFormProps) => {
  const [values, setValues] = useState(item);
  const [errors, setErrors] = useState({ name: '', quantity: '', weight: '' });
  const initialLabelIds = useRef(values.labelIds).current;
  const dispatch = useDispatch();

  // TODO: Consider splitting into individual methods (per value)
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    e.persist();
    const propertyName = e.target.name;
    const propertyValue = e.target.value;
    if (setTitle && propertyName === 'name') setTitle(propertyValue);
    if (
      (propertyName === 'quantity' || propertyName === 'weight') &&
      !propertyValue.match(/^[0-9]+$|^$/g)
    ) {
      return;
    }
    setValues({ ...values, [propertyName]: propertyValue });
  };

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event && event.preventDefault();

    if (validateForm()) {
      const newLabelIds = values.labelIds;
      const addedLabelIds = getArrayDifference(newLabelIds, initialLabelIds);
      addedLabelIds?.forEach((label) =>
        dispatch(incrementItemCount({ itemQuantity: values.quantity, labelId: label }))
      );
      const removedLabelIds = getArrayDifference(initialLabelIds, newLabelIds);
      removedLabelIds?.forEach((label) =>
        dispatch(decrementItemCount({ itemQuantity: values.quantity, labelId: label }))
      );

      onSubmit({
        ...values,
        addedAt: values.addedAt ?? new Date().toISOString(),
        // Lower pack quantity if it exceeds new quantity
packQuantity: values.packQuantity > values.quantity ? values.quantity : values.packQuantity,
        
quantity: Number(values.quantity),
        
        weight: values.weight === '' ? '' : Number(values.weight),
      });
    }
  };

  const validateForm = () => {
    let isFormValid = true;
    const errors = { name: '', quantity: '', weight: '' };

    if (!values.name.trim()) {
      errors.name = 'Name cannot be blank';
      isFormValid = false;
    }
    if (values.quantity < 1) {
      errors.quantity = 'Quantity cannot be zero';
      isFormValid = false;
    }
    // Note that 0g weight is allowed to account for items <0.5g (e.g. micro SD cards)
    setErrors(errors);

    return isFormValid;
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      {/* Name */}
      <Column className="item-form__full-width">
        <FormLabel htmlFor="name">Name</FormLabel>
        <ExpandingInput
          clearError={() => setErrors({ ...errors, name: '' })}
          error={errors.name}
          name="name"
          onChange={handleChange}
          onSubmit={handleSubmit}
          value={values.name}
        />
        {errors.name && <FormError>{errors.name}</FormError>}
      </Column>
      {/* Quantity */}
      <Column>
        <FormLabel htmlFor="quantity">Quantity</FormLabel>
        <Input
          clearError={(e) => {
            Number(e?.target.value) > 0 && setErrors({ ...errors, quantity: '' });
          }}
          error={errors.quantity}
          maxLength={3}
          name="quantity"
          onChange={(e) => handleChange(e)}
          value={values.quantity}
        />
        {errors.quantity && <FormError>{errors.quantity}</FormError>}
      </Column>
      {/* Weight */}
      <Column>
        <FormLabel htmlFor="weight">Weight (grams)</FormLabel>
        <Input
          error={errors.weight}
          maxLength={5}
          name="weight"
          onChange={(e) => handleChange(e)}
          value={values.weight}
        />
      </Column>
      {/* Category */}
      <CategoryPicker
        categoryId={values.categoryId}
        onChange={(categoryId) => setValues({ ...values, categoryId })}
      />
      {/* Labels */}
      <LabelPicker
        labelIds={values.labelIds}
        onChange={(labelIds) => setValues({ ...values, labelIds })}
      />
      {/* Notes */}
      <Column className="item-form__full-width item-form__notes">
        <FormLabel htmlFor="notes">Notes</FormLabel>
        <TextArea name="notes" onChange={handleChange} value={values.notes} />
      </Column>
      {/* Buttons */}
      {children}
    </form>
  );
};
