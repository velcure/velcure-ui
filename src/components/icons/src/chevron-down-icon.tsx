import { cn, forwardRef } from '#/utilities';
import { Icon, IconProps } from './icon';

export const ChevronDownIcon = forwardRef<IconProps, 'svg'>((props, ref) => {
  const { className, ...restProps } = props;
  return (
    <Icon
      {...restProps}
      className={cn('stroke-current', className)}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      stroneLinejoin="round"
      fill="none"
      ref={ref}
    >
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
});
