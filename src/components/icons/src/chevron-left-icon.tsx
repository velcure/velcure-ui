import { cn, forwardRef } from '#/utilities';
import { Icon, IconProps } from './icon';

export const ChevronLeftIcon = forwardRef<IconProps, 'svg'>((props, ref) => {
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
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </Icon>
  );
});
