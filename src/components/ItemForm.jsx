import React, { useState } from 'react';
import LabelSelect from './LabelSelect';

const ItemForm = props => {
  const item = props.item;

  // a fix list of categories for now - later should make them editable and store them in DB
  const categories = ['Backpacks', 'Tents'];
  const [values, setValues] = useState(
    item
      ? item
      : {
          name: '',
          category: 'Backpacks',
          weight: 100,
          size: '',
          quantity: 1,
          notes: '',
          quantityInPack: false,
        }
  );
  const [errors, setErrors] = useState({});

  const onChange = e => {
    e.persist();

    const name = e.target.name;
    const value = e.target.value;
    // prevent entering non-numeric characters into weight or quantity
    if ((name === 'weight' || name === 'quantity') && !value.match(/^\d{1,}$/)) {
      return;
    }
    setValues(values => ({ ...values, [name]: value }));
  };

  const onSubmit = e => {
    e.preventDefault();

    // todo can this be improved? use effect?
    if (!values.name || values.weight < 1 || values.quantity < 1) {
      const errors = {};
      if (!values.name) errors.name = 'Please enter a name';
      if (values.weight < 1) errors.weight = 'Please enter a positive weight';
      if (values.quantity < 1) errors.quantity = 'Please enter a positive quantity';
      setErrors(errors);
    } else {
      props.onSubmit({ ...values });
    }
  };

  return (
    <form onSubmit={onSubmit}>
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
        selectedLabelIds={values.labels}
        setLabels={labels => setValues(values => ({ ...values, labels }))}
      />
      <button>Save item</button>
    </form>
  );
};

export default ItemForm;
