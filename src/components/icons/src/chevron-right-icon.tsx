import { cn, forwardRef } from '#/utilities';
import { Icon, IconProps } from './icon';

export const ChevronRightIcon = forwardRef<IconProps, 'svg'>((props, ref) => {
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
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </Icon>
  );
});
