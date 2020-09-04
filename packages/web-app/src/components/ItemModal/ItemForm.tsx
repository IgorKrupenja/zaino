import { Item } from '@zaino/shared/';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import Categories from '../../constants/Categories';
import { decrementItemCount, incrementItemCount } from '../../state/slices/labels';
import getArrayDifference from '../../utils/getArrayDifference';
import CategoryImage from '../common/CategoryImage';
import CategorySelect from '../common/CategorySelect';
import FormTextInput from '../common/FormTextInput';
import LabelSelect from '../common/LabelSelect';

type ItemFormProps = {
  item?: Item;
  onSubmit: (item: Item) => void;
};

const ItemForm = ({ item, onSubmit }: ItemFormProps) => {
  const newItem: Item = {
    id: uuid(),
    name: '',
    categoryName: Categories[0].name,
    weight: 100,
    quantity: 1,
    packQuantity: 0,
    addedAt: '',
  };
  const [values, setValues] = useState(item ?? newItem);
  const [errors, setErrors] = useState({ name: '', weight: '', quantity: '' });
  // used in onFormSubmit to set label item counts
  const initialLabelIds = item?.labelIds;
  const dispatch = useDispatch();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    e.persist();

    const name = e.target.name;
    const value: string | number = e.target.value;

    // allow entering only numbers or empty string
    if ((name === 'quantity' || name === 'weight') && !value.match(/^[0-9]+$|^$/g)) return;

    setValues({ ...values, [name]: value });
  };

  const validateForm = () => {
    let isFormValid = true;
    const errors = { name: '', weight: '', quantity: '' };
    if (!values.name) {
      errors.name = 'Please enter a name';
      isFormValid = false;
    }
    if (values.weight && values.weight < 1) {
      errors.weight = 'Please enter a positive weight or leave empty';
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

      // todo ugly but could not think of something better that does not produce TS errors
      // todo tracked in #197
      const { weight, ...temp } = values;
      const submitValues: Item = temp;
      // add weight only if weight not empty
      if (weight) submitValues.weight = Number(weight);

      onSubmit({
        ...submitValues,
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
    <form onSubmit={handleSubmit}>
      <FormTextInput name={values.name} onChange={e => handleChange(e)} errorText={errors.name} />
      {/* category image */}
      <CategoryImage categoryName={values.categoryName} />
      {/* category */}
      <CategorySelect
        selectedCategoryName={values.categoryName}
        onChange={categoryName => setValues({ ...values, categoryName })}
      />
      {/* weight */}
      <label>
        <input
          type="text"
          name="weight"
          placeholder="Weight"
          className={`text-input ${errors.weight && 'text-input__error'}`}
          value={values.weight}
          onChange={handleChange}
        />
        grams
      </label>
      {errors.weight && <span>{errors.weight}</span>}
      {/* quantity */}
      <label>
        Quantity
        <input
          type="text"
          name="quantity"
          placeholder="Quantity"
          className={`text-input ${errors.quantity && 'text-input__error'}`}
          value={values.quantity}
          onChange={handleChange}
        />
      </label>
      {errors.quantity && <span>{errors.quantity}</span>}
      {/* notes */}
      <label>
        Notes
        <textarea
          placeholder="Add notes here"
          name="notes"
          className="textarea"
          value={values.notes}
          onChange={handleChange}
        ></textarea>
      </label>
      {/* labels */}
      <LabelSelect
        labelIds={values.labelIds}
        onChange={labelIds => setValues({ ...values, labelIds })}
        isClearable={false}
        isCreatable
      />
      <button>Save item</button>
    </form>
  );
};

export default ItemForm;
