import React, { useRef, useContext, useLayoutEffect } from 'react';

import { AppContext } from '../../contexts';
import Option from '../Option';

import styles from './index.styl';

const Text = ({ element }) => {
  const { setElement } = useContext(AppContext);

  return (
    element.editing
      ? <textarea id="story" name="story" className={styles.textarea}
        rows="5"
        onChange={
          value => setElement(element, { content: value.target.value })
        }
      >
        {element.content}
      </textarea>
      : <p>
        {element.content}
      </p>
  );
};

Text.options = [{
  name: 'cols',
  render: ({ element }) => {
    const { setElement } = useContext(AppContext);

    return (
      <Option
        option={{ icon: 'edit' }}
        onClick={() => {

          setElement(element, { editing: !element.editing });
        }}
      />
    );
  },
}];
export default Text;
