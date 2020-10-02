import { Item } from '@zaino/shared/';
import React, { ChangeEvent, FormEvent, ReactNode, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import EditIcon from '../../../images/icons/edit.svg';
import { decrementItemCount, incrementItemCount } from '../../../state/slices/labels';
import { closeModal } from '../../../utils/closeModal';
import { getArrayDifference } from '../../../utils/getArrayDifference';
import { Button } from '../../Controls/Button';
import { FormLabel } from '../../Controls/FormLabel';
import { Input } from '../../Controls/Input';
import { TextArea } from '../../Controls/TextArea';
import { LabelBadgeList } from '../../Labels/LabelBadgeList';
import { Category } from '../../Misc/Category';
import { CategoryImage } from '../../Misc/CategoryImage';
import { CategorySelect } from '../../Selects/CategorySelect';
import { LabelSelect } from '../../Selects/LabelSelect/LabelSelect';
import { ColumnWrapper } from '../../Wrappers/ColumnWrapper';
import { RowWrapper } from '../../Wrappers/RowWrapper';
import './style.scss';

type ItemFormProps = {
  item: Item;
  onSubmit: (item: Item) => void;
  setTitle?: (title: string) => void;
  children: ReactNode;
};

export const ItemForm = ({ item, onSubmit, setTitle, children }: ItemFormProps) => {
  const [values, setValues] = useState(item);
  const [errors, setErrors] = useState({ name: '', weight: '', quantity: '' });
  // used in onFormSubmit to set label item counts
  const initialLabelIds = useRef(values.labelIds).current;
  const dispatch = useDispatch();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    e.persist();
    const propertyName = e.target.name;
    const propertyValue = e.target.value;
    // set modal title if editing item
    if (setTitle && propertyName === 'name') setTitle(propertyValue);
    // only allow numbers or empty string
    if (
      (propertyName === 'quantity' || propertyName === 'weight') &&
      !propertyValue.match(/^[0-9]+$|^$/g)
    ) {
      return;
    }
    setValues({ ...values, [propertyName]: propertyValue });
  };

  const validateForm = () => {
    let isFormValid = true;
    const errors = { name: '', weight: '', quantity: '' };
    if (!values.name) {
      errors.name = 'Please enter a name';
      isFormValid = false;
    }
    if (values.quantity < 1) {
      errors.quantity = 'Please enter a quantity > 0';
      isFormValid = false;
    }
    // note that 0g weight is allowed to account for items <0.5g (e.g. micro SD cards)
    setErrors(errors);

    return isFormValid;
  };

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event && event.preventDefault();

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
    <form onSubmit={handleSubmit} className="item-form">
      {/* Name */}
      <ColumnWrapper className="item-form__full-width">
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          autoFocus
          isExpanding
          onSubmit={handleSubmit}
          clearError={() => setErrors({ ...errors, name: '' })}
        />
      </ColumnWrapper>
      {/* Quantity */}
      <ColumnWrapper>
        <FormLabel htmlFor="quantity">Quantity</FormLabel>
        <Input
          name="quantity"
          value={values.quantity}
          onChange={e => handleChange(e)}
          error={errors.quantity}
          maxLength={3}
          clearError={e => {
            // clear error only if user enters positive quantity (not '', '0' or e.g. '000')
            if (Number(e?.target.value) > 0) setErrors({ ...errors, quantity: '' });
          }}
        />
      </ColumnWrapper>
      {/* Weight */}
      <ColumnWrapper>
        <FormLabel htmlFor="weight">Weight (grams)</FormLabel>
        <Input
          name="weight"
          value={values.weight}
          onChange={e => handleChange(e)}
          error={errors.weight}
          maxLength={5}
        />
      </ColumnWrapper>
      {/* Category */}
      <ColumnWrapper>
        <CategorySelect
          selectedCategoryName={values.categoryName}
          headerText="Select category"
          onChange={categoryName => setValues({ ...values, categoryName })}
        >
          <Button className="button--white item-form__button">
            Category
            <EditIcon className="button--white__icon item-form__edit-icon" />
          </Button>
        </CategorySelect>
        <RowWrapper>
          <CategoryImage categoryName={values.categoryName} />
          <Category
            category={values.categoryName}
            onClick={closeModal}
            className="item-form__category"
          ></Category>
        </RowWrapper>
      </ColumnWrapper>
      {/* Labels */}
      <ColumnWrapper className="item-form__labels">
        <LabelSelect
          labelIds={values.labelIds}
          headerText="Select labels"
          isCreatable
          onChange={labelIds => setValues({ ...values, labelIds })}
        >
          <Button className="button--white item-form__button">
            Labels
            <EditIcon className="button--white__icon item-form__edit-icon--labels" />
          </Button>
        </LabelSelect>
        <LabelBadgeList onBadgeClick={closeModal} labelIds={values.labelIds} />
      </ColumnWrapper>
      {/* Notes */}
      <ColumnWrapper className="item-form__full-width item-form__notes">
        <FormLabel htmlFor="notes">Notes</FormLabel>
        <TextArea name="notes" value={values.notes} onChange={handleChange} />
      </ColumnWrapper>
      {/* buttons */}
      {children}
    </form>
  );
};
