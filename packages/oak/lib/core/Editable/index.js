import { createPortal } from 'react-dom';
import {
  Children,
  cloneElement,
  forwardRef,
  useReducer,
  useState,
  useImperativeHandle,
} from 'react';
import {
  mockState,
  cloneDeep,
  classNames,
  set,
  get,
} from '@poool/junipero-utils';
import { useEventListener } from '@poool/junipero-hooks';
import { usePopper } from 'react-popper';

import { useBuilder } from '../../hooks';

export default forwardRef(({
  globalEventsTarget = global,
  children,
  element,
  component,
  container,
}, ref) => {
  const { setElement, getField } = useBuilder();
  const [popper, setPopper] = useState();
  const [reference, setReference] = useState();
  const [state, dispatch] = useReducer(mockState, {
    opened: false,
    element: cloneDeep(element),
  });
  const { styles: popperStyles, attributes } = usePopper(reference, popper, {
    ...((typeof component?.settings?.popperSettings === 'function'
      ? component?.settings?.popperSettings({ optionButtonElement: reference })
      : component?.settings?.popperSettings
    ) || {
      strategy: 'fixed',
      modifiers: [{
        name: 'offset',
        options: {
          offset: [0, 5],
        },
      }],
    }),
  });

  useImperativeHandle(ref, () => ({
    open,
    close,
    toggle,
  }));

  useEventListener('click', e => {
    onClickOutside_(e);
  }, globalEventsTarget);

  const open = () => {
    dispatch({ opened: true });
  };

  const close = () => {
    dispatch({ opened: false });
  };

  const toggle = () =>
    state.opened ? close() : open();

  const onClickOutside_ = e => {
    if (!popper || !reference || !state.opened) {
      return;
    }

    if (
      reference !== e.target &&
      !reference.contains(e.target) &&
      popper !== e.target &&
      !popper.contains(e.target)
    ) {
      dispatch({ opened: false });
    }
  };

  const onUpdate_ = elmt => {
    setElement(element, elmt);
  };

  const onSettingChange_ = (name, field) => {
    set(state.element, name, field.checked ?? field.value);
    dispatch({ element: state.element });
    setElement(element, state.element);
  };

  const renderField = field => {
    const commonProps = {
      id: field.id,
      name: field.name,
      onChange: onSettingChange_.bind(null, field.key),
      value: get(state.element, field.key) ?? field.default,
    };

    const renderer = getField(field.type) || field;

    return renderer.render?.(commonProps, field);
  };

  const settingsForm = (
    <div
      ref={setPopper}
      style={popperStyles.popper}
      {...attributes.popper}
      className="oak-editable"
    >
      <div className="oak-title">
        { component.settings?.title || 'Element options' }
      </div>
      <div className="oak-form">
        { component.settings?.fields?.map((field, i) => (
          <div className="oak-field" key={i}>
            { field.label && (
              <label>{ field.label }</label>
            ) }
            { renderField(field) }
          </div>
        )) }
        { component.settings?.renderForm?.({
          element: cloneDeep(element),
          component,
          update: onUpdate_,
        }) }
      </div>
    </div>
  );

  return (
    <>
      { children && cloneElement(Children.only(children), {
        ref: setReference,
        className: classNames(
          Children.only(children).props.className,
          { 'oak-opened': state.opened }
        ),
      }) }
      { state.opened
        ? container?.current
          ? createPortal(settingsForm, container.current) : settingsForm
        : null }
    </>
  );
});