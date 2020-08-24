import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { categories, CategoryName } from '../../constants/categories';
import { decrementItemCount, incrementItemCount } from '../../state/slices/labels';
import { Item } from '../../types/Item';
import getArrayDifference from '../../utils/getArrayDifference';
import CategoryImage from '../common/CategoryImage';
import FormTextInput from '../common/FormTextInput';
import LabelSelect, { LabelOption } from '../common/LabelSelect';

type ItemFormProps = {
  item?: Item;
  onSubmit: (item: Item) => void;
};

const ItemForm = ({ item, onSubmit }: ItemFormProps) => {
  // a fixed list of categories for now - later should make them editable and store them in DB
  const newItem: Item = {
    id: uuid(),
    name: '',
    categoryName: CategoryName.backpacks,
    weight: 100,
    quantity: 1,
    packQuantity: 0,
    addedAt: '',
  };
  const [values, setValues] = useState(item ?? newItem);
  const [errors, setErrors] = useState({ name: '', weight: '', quantity: '' });
  // used in onFormSubmit to set label item counts
  const initialLabels = item?.labelIds;
  const dispatch = useDispatch();

  // SyntheticEvent as used for different HTMLElements
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    e.persist();

    const name = e.target.name;
    let value: string | number = e.target.value;

    if (name === 'weight' || name === 'quantity') {
      // prevent entering non-numeric characters
      if (!value.match(/^\d{1,}$/g)) return;
      // convert to number
      value = Number(value);
    }
    setValues({ ...values, [name]: value });
  };

  // todo merge with above?
  const handleLabelChange = (newValues: LabelOption[]) => {
    // process new values for labels from LabelSelect
    const labelIds: string[] = newValues ? newValues.map((label: LabelOption) => label.value) : [];
    // and set those as labels for item
    setValues({ ...values, labelIds });
  };

  const validateForm = () => {
    let isFormValid = true;
    const errors = { name: '', weight: '', quantity: '' };
    if (!values.name) {
      errors.name = 'Please enter a name';
      isFormValid = false;
    }
    if (values.weight < 1) {
      errors.weight = 'Please enter a positive weight';
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
      const newLabels = values.labelIds;
      const addedLabels = getArrayDifference(newLabels, initialLabels);
      addedLabels?.forEach(label => dispatch(incrementItemCount(label)));
      const removedLabels = getArrayDifference(initialLabels, newLabels);
      removedLabels?.forEach(label => dispatch(decrementItemCount(label)));

      onSubmit({
        ...values,
        // do not overwrite addedAt when editing item
        addedAt: values.addedAt || new Date().toISOString(),
        // lower pack quantity if it exceeds new quantity
        packQuantity: values.packQuantity > values.quantity ? values.quantity : values.packQuantity,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormTextInput name={values.name} onChange={e => handleChange(e)} errorText={errors.name} />
      {/* category */}
      <select name="categoryName" value={values.categoryName} onChange={handleChange}>
        {categories.map(category => (
          <option value={category.name} key={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      {/* category image */}
      <CategoryImage categoryName={values.categoryName} />
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
      <input
        type="text"
        name="quantity"
        placeholder="Quantity"
        className={`text-input ${errors.quantity && 'text-input__error'}`}
        value={values.quantity}
        onChange={handleChange}
      />
      {errors.quantity && <span>{errors.quantity}</span>}
      {/* notes */}
      <textarea
        placeholder="Add notes here"
        name="notes"
        className="textarea"
        value={values.notes}
        onChange={handleChange}
      ></textarea>
      {/* labels */}
      <LabelSelect
        labelIds={values.labelIds}
        onChange={handleLabelChange}
        isClearable={false}
        isCreatable
      />
      <button>Save item</button>
    </form>
  );
};

export default ItemForm;
