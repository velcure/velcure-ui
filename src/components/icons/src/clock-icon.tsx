import { cn, forwardRef } from '#/utilities';
import { Icon, IconProps } from './icon';

export const ClockIcon = forwardRef<IconProps, 'svg'>((props, ref) => {
  const { className, ...restProps } = props;
  return (
    <Icon
      {...restProps}
      className={cn('stroke-current', className)}
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      ref={ref}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </Icon>
  );
});
