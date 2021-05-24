import { forwardRef } from 'react';
import { classNames } from '@poool/junipero-utils';

export default forwardRef(({
  className,
  option,
  renderIcon,
  ...props
}, ref) => (
  <a
    { ...props }
    ref={ref}
    href="#"
    draggable={false}
    className={classNames('oak-option', className)}
  >
    { renderIcon ? renderIcon?.() : (
      <i className="material-icons">{ option?.icon }</i>
    ) }
  </a>
));
