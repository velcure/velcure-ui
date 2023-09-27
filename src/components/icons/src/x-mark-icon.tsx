import { forwardRef } from '#/utilities';
import { Icon, IconProps } from './icon';

export const XMarkIcon = forwardRef<IconProps, 'svg'>((props, ref) => {
  return (
    <Icon {...props} className="stroke-current" ref={ref}>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </Icon>
  );
});
