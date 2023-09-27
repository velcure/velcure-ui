import { As, cn, forwardRef } from '#/utilities';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  as?: As;
}

const fallbackIcon = {
  path: (
    <g stroke="currentColor" strokeWidth="1.5">
      <path
        strokeLinecap="round"
        fill="none"
        d="M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"
      />
      <path
        fill="currentColor"
        strokeLinecap="round"
        d="M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"
      />
      <circle fill="none" strokeMiterlimit="10" cx="12" cy="12" r="11.25" />
    </g>
  ),
  viewBox: '0 0 24 24',
};

export const Icon = forwardRef<IconProps, 'svg'>((props, ref) => {
  const {
    as: Element,
    viewBox = fallbackIcon.viewBox,
    color = 'currentColor',
    focusable = false,
    children,
    className,
    ...rest
  } = props;

  const shared = {
    ref,
    focusable,
    color: color,
    className: cn(
      'align-middle w-4 h-4 inline-block leading-0 shrink-0',
      className
    ),
  };

  if (Element && typeof Element !== 'string') {
    return <Element {...shared} {...rest} />;
  }

  const _path = (children ?? fallbackIcon.path) as React.ReactNode;

  return (
    <svg viewBox={viewBox} {...shared} {...rest}>
      {_path}
    </svg>
  );
});

Icon.displayName = 'Icon';
