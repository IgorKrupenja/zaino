import { Item } from '@zaino/shared/';
import React, { ChangeEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import Categories from '../../constants/Categories';
import { decrementItemCount, incrementItemCount } from '../../state/slices/labels';
import getArrayDifference from '../../utils/getArrayDifference';
import { Input } from '../Input/';
import CategoryImage from '../misc/CategoryImage';
import { TextArea } from '../misc/TextArea';
import { CategorySelect } from '../Selects/CategorySelect/';
import { LabelSelect } from '../Selects/LabelSelect/LabelSelect';

type ItemFormProps = {
  item?: Item;
  onSubmit: (item: Item) => void;
};

const ItemForm = ({ item, onSubmit }: ItemFormProps) => {
  const newItem: Item = {
    id: uuid(),
    name: '',
    categoryName: Categories[0].name,
    weight: '',
    quantity: 1,
    packQuantity: 0,
    addedAt: '',
  };
  const [values, setValues] = useState(item ?? newItem);
  const [errors, setErrors] = useState({ name: '', weight: '', quantity: '' });
  // used in onFormSubmit to set label item counts
  const initialLabelIds = useRef(values.labelIds).current;
  const dispatch = useDispatch();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    e.persist();
    const name = e.target.name;
    const value: string = e.target.value;
    if ((name === 'quantity' || name === 'weight') && !value.match(/^[0-9]+$|^$/g)) {
      return;
    }
    setValues({ ...values, [name]: value });
  };

  const validateForm = () => {
    let isFormValid = true;
    const errors = { name: '', weight: '', quantity: '' };
    if (!values.name) {
      errors.name = 'Please enter a name';
      isFormValid = false;
    }
    if (values.quantity < 1) {
      errors.quantity = 'Please enter a positive quantity';
      isFormValid = false;
    }
    setErrors(errors);

    return isFormValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      // update item counts for labels
      const newLabelIds = values.labelIds;
      const addedLabelIds = getArrayDifference(newLabelIds, initialLabelIds);
      addedLabelIds?.forEach(label =>
        dispatch(incrementItemCount({ labelId: label, itemQuantity: values.quantity }))
      );
      const removedLabelIds = getArrayDifference(initialLabelIds, newLabelIds);
      removedLabelIds?.forEach(label =>
        dispatch(decrementItemCount({ labelId: label, itemQuantity: values.quantity }))
      );

      onSubmit({
        ...values,
        // preserve empty string for weight
        weight: values.weight === '' ? '' : Number(values.weight),
        // do not overwrite addedAt when editing item
        addedAt: values.addedAt || new Date().toISOString(),
        // convert to number
        quantity: Number(values.quantity),
        // lower pack quantity if it exceeds new quantity
        packQuantity: values.packQuantity > values.quantity ? values.quantity : values.packQuantity,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* todo */}
        {/* {values.name} */}
        <Input
          title="Name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          autoFocus
        />
        <CategoryImage categoryName={values.categoryName} />
        <Input
          title="Weight (grams)"
          name="weight"
          value={values.weight}
          onChange={e => handleChange(e)}
          error={errors.weight}
        />
        <Input
          title="Quantity"
          value={values.quantity}
          onChange={e => handleChange(e)}
          error={errors.quantity}
        />
        {/* notes */}
        <TextArea
          title="Notes"
          name="notes"
          value={values.notes}
          onChange={handleChange}
        ></TextArea>
        <LabelSelect
          labelIds={values.labelIds}
          headerText="Select labels"
          isCreatable
          onChange={labelIds => setValues({ ...values, labelIds })}
        />
        <CategorySelect
          selectedCategoryName={values.categoryName}
          headerText="Select category"
          onChange={categoryName => setValues({ ...values, categoryName })}
        />
        <button>Save item</button>
      </form>
      {/* labels and categories moved outside of form as toggling them was broken inside */}
    </>
  );
};

export default ItemForm;
