import {
  classNames,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  exists,
  mockState,
  TextField,
  ToggleField,
  Tooltip,
} from '@poool/junipero';
import { Text } from '@poool/oak';
import { useReducer } from 'react';

import { schema } from '../schema';
import { getActiveAttrs } from '../utils';

export default ({ className, state: prosemirrorState, onChange }) => {
  const [state, dispatch] = useReducer(mockState, {
    href: '',
    target: null,
  });

  const onClick = () => {
    const {
      href,
      target,
    } = getActiveAttrs(prosemirrorState, schema.marks.link);
    dispatch({ href, target });
  };

  const onChange_ = (name, field) => {
    dispatch({
      [name]: exists(field.checked)
        ? field.checked
          ? field.value
          : null
        : field.value,
    });
    onChange({
      ...state,
      [name]: exists(field.checked)
        ? field.checked
          ? field.value
          : null
        : field.value });
  };

  return (
    <Dropdown className="oak-link-field">
      <DropdownToggle tag="span">
        <Tooltip text={(
          <Text
            name="addons.richtextField.fields.editor.link"
            default="Link"
          />
        )}
        >
          <a
            href="#"
            onClick={onClick}
            className={classNames(
              'oak-toolbar-button',
              'oak-link-button',
              {
                'oak-active': false,
              },
              className,
            )}
          >
            <i className="oak-icons">
              link
            </i>
          </a>
        </Tooltip>
      </DropdownToggle>
      <DropdownMenu className="oak-link-input">
        <TextField
          placeholder={(
            <Text
              name="addons.richtextField.fields.editor.link"
              default="Link"
            />
          )}
          value={state.href}
          onChange={onChange_.bind(null, 'href')}
          className="oak-link-url"
        />
        <ToggleField
          checkedLabel={(
            <Text
              name="addons.richtextField.fields.editor.blank"
              default="Open in a new window"
            />
          )}
          uncheckedLabel={(
            <Text
              name="addons.richtextField.fields.editor.blank"
              default="Open in a new window"
            />
          )}
          checked={state.target === '_blank'}
          onChange={onChange_.bind(null, 'target')}
          value="_blank"
        />
      </DropdownMenu>
    </Dropdown>
  );
};
