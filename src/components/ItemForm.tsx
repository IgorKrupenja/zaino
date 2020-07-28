import React, { useState, ChangeEvent } from 'react';
import { v4 as uuid } from 'uuid';
import LabelSelect from './LabelSelect';
import { Item } from '../types/types';

type ItemFormProps = {
  item: Item;
  onSubmit: (item: Item) => void;
};
const newItem: Item = {
  id: uuid(),
  name: '',
  category: 'Backpacks',
  weight: 100,
  quantity: 1,
  quantityInPack: 0,
};

// todo do I need to store empty values in Firestore???

const ItemForm = ({ item, onSubmit }: ItemFormProps) => {
  // a fixed list of categories for now - later should make them editable and store them in DB
  const categories = ['Backpacks', 'Tents'];
  const [values, setValues] = useState(item);
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
    setValues(values => ({ ...values, [name]: value }));
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // todo can this be improved? useEffect?
    // todo see e.g. https://stackoverflow.com/questions/41296668/reactjs-form-input-validation
    if (!values.name || values.weight < 1 || values.quantity < 1) {
      const errors = { name: '', weight: '', quantity: '' };
      if (!values.name) errors.name = 'Please enter a name';
      if (values.weight < 1) errors.weight = 'Please enter a positive weight';
      if (values.quantity < 1) errors.quantity = 'Please enter a positive quantity';
      setErrors(errors);
    } else {
      onSubmit({ ...values });
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
      {errors.name && <p>{errors.name}</p>}
      <select name="category" value={values.category} onChange={onChange}>
        {categories.map((category, index) => (
          <option key={index}>{category}</option>
        ))}
      </select>
      <img
        src={require(`../images/categories/${values.category.toLowerCase()}.svg`)}
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
      {errors.weight && <p>{errors.weight}</p>}
      <input
        type="text"
        name="size"
        placeholder="Size"
        className="text-input"
        value={values.size}
        onChange={onChange}
      />
      <input
        type="text"
        name="quantity"
        placeholder="Quantity"
        className={`text-input ${errors.quantity && 'text-input__error'}`}
        value={values.quantity}
        onChange={onChange}
      />
      {errors.quantity && <p>{errors.quantity}</p>}
      <textarea
        placeholder="Add notes here"
        name="notes"
        className="textarea"
        value={values.notes}
        onChange={onChange}
      ></textarea>
      <LabelSelect
        selectedLabelIds={values.labels ? values.labels : []}
        setLabels={(labels: string[]) => setValues(values => ({ ...values, labels: labels }))}
      />
      <button>Save item</button>
    </form>
  );
};

ItemForm.defaultProps = { item: newItem };

export default ItemForm;
