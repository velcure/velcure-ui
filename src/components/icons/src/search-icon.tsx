import { forwardRef } from '#/utilities';
import { Icon, IconProps } from './icon';

export const SearchIcon = forwardRef<IconProps, 'svg'>((props, ref) => {
  return (
    <Icon
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      ref={ref}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </Icon>
  );
});
