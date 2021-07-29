import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { mockState } from '@poool/junipero-utils';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';
import isHotkey from 'is-hotkey';
import { Text } from '@poool/oak';

import { toggleMark, withHtml } from './editor';
import BlockButton from './BlockButton';
import Element from './Element';
import Leaf from './Leaf';
import ColorButton from './ColorButton';
import MarkButton from './MarkButton';
import SizeButton from './SizeButton';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
};

export default ({
  value,
  onChange,
  element,
}) => {
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(() => (
    withHtml(withHistory(withReact(createEditor())))
  ), []);
  const [state, dispatch] = useReducer(mockState, {
    value: value || [{ children: [{ text: '' }] }],
  });

  useEffect(() => {
    if (value) {
      dispatch({ value });
    }
  }, [value]);

  const onChange_ = val => {
    dispatch({ value: val });
    onChange?.({ value: val });
  };

  const onKeyDown = e => {
    Object.entries(HOTKEYS).forEach(([key, mark]) => {
      if (isHotkey(key, e)) {
        e.preventDefault();
        toggleMark(editor, mark);
      }
    });
  };

  const computeSize = () => {
    if (!element || element.type !== 'title') {
      return 16;
    } else {
      switch (element.headingLevel) {
        case 'h1':
          return 32;
        case 'h2':
          return 24;
        case 'h3':
          return 19;
        case 'h4':
          return 16;
        case 'h5':
          return 13;
        case 'h6':
          return 10;
        default:
          return 16;
      }
    }
  };

  const getTextSize = () => {
    const path = editor.selection?.anchor?.path;
    const selectedRow = editor.children[path?.[0]];
    const selectedContent = Array.isArray(selectedRow)
      ? selectedRow[path?.[1]]
      : selectedRow?.children?.[path?.[1]];
    const selectedSize = parseInt(selectedContent?.size?.split('p')[0]);

    return selectedSize || computeSize();
  };

  return (
    <Slate
      editor={editor}
      value={state.value}
      onChange={onChange_}
    >
      <div className="oak-text-editor">
        <div className="oak-toolbar">
          <MarkButton
            format="bold"
            icon="format_bold"
            tooltipText={(
              <Text>{t => t('addons.basicComponents.fields.editor.bold',
                'Bold')}
              </Text>
            )}
          />
          <MarkButton
            format="italic"
            icon="format_italic"
            tooltipText={(
              <Text>{t => t('addons.basicComponents.fields.editor.italic',
                'Italic')}
              </Text>
            )}
          />
          <MarkButton
            format="underline"
            icon="format_underlined"
            tooltipText={(
              <Text>{t => t('addons.basicComponents.fields.editor.underline',
                'Underline')}
              </Text>
            )}
          />
          <ColorButton />
          <SizeButton
            icon="horizontal_rule"
            increase={false}
            currentSize={getTextSize()}
            tooltipText={(
              <Text>{t => t('addons.basicComponents.fields.editor.decrease',
                'Decrease size')}
              </Text>
            )}
          />
          <span className="oak-text-size">{ getTextSize() }</span>
          <SizeButton
            icon="add"
            currentSize={getTextSize()}
            tooltipText={(
              <Text>{t => t('addons.basicComponents.fields.editor.increase',
                'Increase size')}
              </Text>
            )}
          />
          <BlockButton
            format="text-left"
            icon="format_align_left"
            tooltipText={(
              <Text>{t => t('addons.basicComponents.fields.editor.left',
                'Align left')}
              </Text>
            )}
          />
          <BlockButton
            format="text-center"
            icon="format_align_center"
            tooltipText={(
              <Text>{t => t('addons.basicComponents.fields.editor.center',
                'Align center')}
              </Text>
            )}
          />
          <BlockButton
            format="text-right"
            icon="format_align_right"
            tooltipText={(
              <Text>{t => t('addons.basicComponents.fields.editor.right',
                'Align right')}
              </Text>
            )}
          />
          <BlockButton
            format="text-justify"
            icon="format_align_justify"
            tooltipText={(
              <Text>{t => t('addons.basicComponents.fields.editor.justify',
                'Justify')}
              </Text>
            )}
          />
        </div>
        <Editable
          onDrop={e => e.preventDefault()}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck={false}
          onKeyDown={onKeyDown}
          className="oak-text-editable"
          style={{ fontSize: computeSize() }}
        />
      </div>
    </Slate>
  );
};
