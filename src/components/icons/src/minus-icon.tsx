import { forwardRef } from '#/utilities';
import { Icon, IconProps } from './icon';

export const MinusIcon = forwardRef<IconProps, 'svg'>((props, ref) => {
  return (
    <Icon
      {...props}
      className="stroke-current"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      ref={ref}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </Icon>
  );
});
