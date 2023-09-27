import { forwardRef } from '#/utilities';
import { Icon, IconProps } from './icon';

export const PlusIcon = forwardRef<IconProps, 'svg'>((props, ref) => {
  return (
    <Icon
      {...props}
      className="stroke-current"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      ref={ref}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </Icon>
  );
});
