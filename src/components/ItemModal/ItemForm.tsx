import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { decrementItemCount, incrementItemCount } from '../../slices/labels';
import { Category, Item } from '../../types/items';
import { LabelOption } from '../../types/labels';
import LabelSelect from '../common/LabelSelect';

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
  // used in onFormSubmit to set label item counts
  const initialLabels = item?.labelIds;
  const dispatch = useDispatch();

  // SyntheticEvent as used for different HTMLElements
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const onLabelChange = (newValues: LabelOption[]) => {
    // process new values for labels from LabelSelect
    const labels: string[] = newValues ? newValues.map((label: LabelOption) => label.value) : [];
    // and set those as labels for item
    setValues({ ...values, labelIds: labels });
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

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      // update item counts for labels
      const newLabels = values.labelIds;
      const addedLabels = newLabels?.filter(label => !initialLabels?.includes(label));
      addedLabels?.forEach(label => dispatch(incrementItemCount(label)));
      const removedLabels = initialLabels?.filter(label => !newLabels?.includes(label));
      removedLabels?.forEach(label => dispatch(decrementItemCount(label)));
      onSubmit({
        ...values,
        // do not overwrite date/time added when editing item
        addedAt: values.addedAt || new Date().toISOString(),
        // lower pack quantity if it exceeds new quantity
        packQuantity: values.packQuantity > values.quantity ? values.quantity : values.packQuantity,
      });
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
        src={`../../images/categories/${values.category.toLowerCase()}.svg`}
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
      <LabelSelect itemValues={values} onChange={onLabelChange} isClearable={false} isCreatable />
      <button>Save item</button>
    </form>
  );
};

export default ItemForm;
