import React from 'react';
import { classNames } from '@poool/junipero-utils';

import styles from './index.styl';

export default ({
  className,
  option,
  renderIcon,
  ...props
}) => {
  return (
    <a
      { ...props }
      href="#"
      className={classNames(styles.option, className)}
    >
      { renderIcon ? renderIcon?.() : (
        <i className="material-icons">{ option?.icon }</i>
      ) }
    </a>
  );
};