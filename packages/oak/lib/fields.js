import {
  TextField,
  SelectField,
  ColorField,
  DateField,
  Toggle,
} from '@junipero/react';

import CoreImageField from './core/CoreImageField';
import Text from './core/Text';

export const FIELD_TEXT = {
  type: 'text',
  deserialize: val => '' + val,
  render: (props, { field } = {}) => (
    <TextField
      { ...props }
      placeholder={<Text>{ field.placeholder }</Text>}
      type={field.valueType || 'text'}
    />
  ),
};

export const FIELD_TEXTAREA = {
  type: 'textarea',
  deserialize: val => '' + val,
  render: (props, { field } = {}) => (
    <TextField
      { ...props }
      tag="textarea"
      rows={props.rows || 5}
      placeholder={<Text>{ field.placeholder }</Text>}
      type={field.valueType || 'text'}
    />
  ),
};

export const FIELD_SELECT = {
  type: 'select',
  render: (props, { field } = {}) => (
    <SelectField
      { ...props }
      options={field.options}
      placeholder={<Text>{ field.placeholder }</Text>}
      parseTitle={field.parseTitle ||
        (o => o?.title ? <Text>{ o.title }</Text> : o)}
      parseValue={field.parseValue || (o => o?.value ?? o)}
    />
  ),
};

export const FIELD_COLOR = {
  type: 'color',
  render: (props, { field } = {}) => (
    <ColorField
      { ...props }
      placeholder={<Text>{ field.placeholder }</Text>}
    />
  ),
};

export const FIELD_CORE_IMAGE = {
  type: 'core-image',
  render: props => (
    <CoreImageField { ...props } />
  ),
};

export const FIELD_DATE = {
  type: 'date',
  render: (props, { field } = {}) => (
    <DateField
      { ...props }
      placeholder={<Text>{ field.placeholder }</Text>}
    />
  ),
};

export const FIELD_TOGGLE = {
  type: 'toggle',
  render: (props, { field } = {}) => (
    <ToggleField
      { ...props }
      checkedLabel={<Text>{ field.checkedLabel }</Text>}
      uncheckedLabel={<Text>{ field.uncheckedLabel }</Text>}
    />
  ),
};

export const BASE_FIELDTYPES = [
  FIELD_TEXT, FIELD_TEXTAREA, FIELD_SELECT, FIELD_COLOR, FIELD_CORE_IMAGE,
  FIELD_DATE, FIELD_TOGGLE,
];
