import React, { useState, ChangeEvent, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import LabelSelect from './LabelSelect';
import { Item, Category } from '../types/types';

type ItemFormProps = {
  item?: Item;
  onSubmit: (item: Item) => void;
};

const ItemForm = ({ item, onSubmit }: ItemFormProps) => {
  // a fixed list of categories for now - later should make them editable and store them in DB
  const newItem: Item = {
    id: uuid(),
    name: '',
    category: Category.backpacks,
    weight: 100,
    quantity: 1,
    packQuantity: 0,
    addedAt: '',
  };
  const [values, setValues] = useState(item ?? newItem);
  const [errors, setErrors] = useState({ name: '', weight: '', quantity: '' });

  // SyntheticEvent as used for different HTMLElements
  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    e.persist();

    const name = e.target.name;
    const value = e.target.value;

    // prevent entering non-numeric characters into weight or quantity
    if ((name === 'weight' || name === 'quantity') && !value.match(/^\d{1,}$/g)) {
      return;
    }
    setValues({ ...values, [name]: value });
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    if (isFormValid) {
      // do not overwrite date when editing item
      const addedAt = values.addedAt || new Date().toISOString();
      onSubmit({ ...values, addedAt });
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        className={`text-input ${errors.name && 'text-input__error'}`}
        value={values.name}
        onChange={onChange}
      />
      {errors.name && <span>{errors.name}</span>}
      <select name="category" value={values.category} onChange={onChange}>
        {Object.values(Category).map(value => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
      <img
        src={`../images/categories/${values.category.toLowerCase()}.svg`}
        className="list-item__image"
      />
      <label>
        <input
          type="text"
          name="weight"
          placeholder="Weight"
          className={`text-input ${errors.weight && 'text-input__error'}`}
          value={values.weight}
          onChange={onChange}
        />
        grams
      </label>
      {errors.weight && <span>{errors.weight}</span>}
      <input
        type="text"
        name="quantity"
        placeholder="Quantity"
        className={`text-input ${errors.quantity && 'text-input__error'}`}
        value={values.quantity}
        onChange={onChange}
      />
      {errors.quantity && <span>{errors.quantity}</span>}
      <textarea
        placeholder="Add notes here"
        name="notes"
        className="textarea"
        value={values.notes}
        onChange={onChange}
      ></textarea>
      <LabelSelect
        selectedLabelIds={values.labels ?? []}
        itemValues={values}
        setItemValues={setValues}
      />
      <button>Save item</button>
    </form>
  );
};

export default ItemForm;
