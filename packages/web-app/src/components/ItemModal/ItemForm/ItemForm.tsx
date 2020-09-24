import { Item } from '@zaino/shared/';
import React, { ChangeEvent, FormEvent, ReactNode, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import EditIcon from '../../../images/icons/edit.svg';
import { history } from '../../../routes/AppRouter';
import { decrementItemCount, incrementItemCount } from '../../../state/slices/labels';
import getArrayDifference from '../../../utils/getArrayDifference';
import { Button } from '../../Controls/Button';
import { FormLabel } from '../../Controls/FormLabel';
import { Input } from '../../Controls/Input';
import { TextArea } from '../../Controls/TextArea';
import { LabelBadgeList } from '../../Labels/LabelBadgeList';
import { CategoryImage } from '../../Misc/CategoryImage';
import { ColumnWrapper } from '../../Misc/ColumnWrapper';
import { RowWrapper } from '../../Misc/RowWrapper';
import { CategorySelect } from '../../Selects/CategorySelect';
import { LabelSelect } from '../../Selects/LabelSelect/LabelSelect';
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
        <Input
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          autoFocus
          isExpanding
          onSubmit={handleSubmit}
          clearError={() => setErrors({ ...errors, name: '' })}
        >
          <FormLabel htmlFor="name">Name</FormLabel>
        </Input>
      </ColumnWrapper>
      {/* Quantity */}
      <ColumnWrapper>
        <Input
          name="quantity"
          value={values.quantity}
          onChange={e => handleChange(e)}
          error={errors.quantity}
          clearError={e => {
            // clear error only if user enters positive quantity (not '', '0' or e.g. '000')
            if (Number(e?.target.value) > 0) setErrors({ ...errors, quantity: '' });
          }}
        >
          <FormLabel htmlFor="quantity">Quantity</FormLabel>
        </Input>
      </ColumnWrapper>
      {/* Weight */}
      <ColumnWrapper>
        <Input
          name="weight"
          value={values.weight}
          onChange={e => handleChange(e)}
          error={errors.weight}
        >
          <FormLabel htmlFor="weight">Weight (grams)</FormLabel>
        </Input>
      </ColumnWrapper>
      {/* Category */}
      <ColumnWrapper>
        <CategorySelect
          selectedCategoryName={values.categoryName}
          headerText="Select category"
          onChange={categoryName => setValues({ ...values, categoryName })}
        >
          <Button className="button--white button--medium">
            Category
            <EditIcon className="button--white__icon button__icon--small" />
          </Button>
        </CategorySelect>
        <RowWrapper>
          <CategoryImage categoryName={values.categoryName} />
          <div className="cat-test">{values.categoryName}</div>
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
          <Button className="button--white button--medium">
            Labels
            <EditIcon className="button--white__icon button__icon--small" />
          </Button>
        </LabelSelect>
        <LabelBadgeList
          onBadgeClick={() => history.push('/dashboard')}
          labelIds={values.labelIds}
        />
      </ColumnWrapper>
      {/* Notes */}
      <ColumnWrapper className="item-form__full-width item-form__notes">
        <TextArea name="notes" value={values.notes} onChange={handleChange}>
          <FormLabel htmlFor="notes">Notes</FormLabel>
        </TextArea>
      </ColumnWrapper>
      {/* buttons */}
      {children}
    </form>
  );
};
