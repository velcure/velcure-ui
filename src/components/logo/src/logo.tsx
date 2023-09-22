import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef, useId } from 'react';

type LogoBaseProps = {
  invert?: boolean;
};

export interface LogomarkProps
  extends LogoBaseProps,
    ComponentPropsWithoutRef<'svg'> {}

export const Logomark = forwardRef<SVGSVGElement, LogomarkProps>(
  (props, ref) => {
    const { invert, className, ...restProps } = props;
    const id = useId();

    return (
      <svg
        viewBox="0 0 28.2 24.88"
        aria-hidden="true"
        ref={ref}
        className={cn('fill-none', className)}
        {...restProps}
      >
        <g
          id={`${id}-path`}
          className={invert ? 'fill-white' : 'stroke-neutral-950'}
        >
          <path d="m27.6,1.68l-2.42,4.33h-3.19l1.59-2.75h-3.15l-4.78,8.27h-2c-.53,0-.86-.57-.59-1.03l4.18-7.24,1.36-2.42c.13-.21.35-.34.59-.34l7.82.15c.53,0,.86.57.59,1.03Z" />
          <path d="m23.57,8.77s0,.01,0,.01l-8.81,15.26c-.26.45-.91.45-1.17,0L.59,1.51c-.26-.45.06-1.01.59-1.01h13.26c.52,0,.85.56.59,1.01l-.81,1.41c-.13.21-.35.33-.59.33H4.79l9.39,16.28,6.02-10.42c.12-.2.34-.34.58-.34h2.79Z" />
        </g>
      </svg>
    );
  }
);

export interface LogoProps
  extends LogoBaseProps,
    ComponentPropsWithoutRef<'svg'> {}

export const Logo = forwardRef<SVGSVGElement, LogoProps>((props, ref) => {
  const { className, invert, ...restProps } = props;
  return (
    <svg
      ref={ref}
      viewBox="0 0 130 32"
      {...restProps}
      className={cn('group/logo h-12 w-auto', className)}
    >
      <Logomark preserveAspectRatio="xMinYMid meet" invert={invert} />
      <g id="wordmark" className={invert ? 'fill-white' : 'fill-neutral-950'}>
        <path d="m52.05,23.85h-4.61l-6.22-17.08h4.69l3.84,12.29,3.84-12.29h4.71l-6.25,17.08Z" />
        <path d="m60.72,18.81c.28,1.61,1.28,2.3,2.64,2.3.95,0,1.74-.31,2.36-.92l2.25,2.3c-1.02,1.02-2.41,1.69-4.69,1.69-4.07,0-6.66-2.51-6.66-6.22,0-3.33,2.38-6.22,5.97-6.22s5.56,2.07,5.56,6.15v.92h-7.42Zm3.58-2.64c0-1.1-.54-1.72-1.72-1.72-.9,0-1.56.59-1.84,1.9h3.56v-.18Z" />
        <path d="m68.79,23.85V6.77h4.1v17.08h-4.1Z" />
        <path d="m79.85,24.19c-3.82,0-6.58-2.43-6.58-6.22s2.76-6.22,6.58-6.22c2,0,3.69.77,4.61,1.69l-2.28,2.3c-.46-.46-1.1-.85-1.92-.85-1.46,0-2.71,1.13-2.71,3.07s1.25,3.07,2.71,3.07c.82,0,1.46-.38,1.92-.84l2.28,2.3c-.92.92-2.61,1.69-4.61,1.69Z" />
        <path d="m92.6,23.85v-1.79c-.72,1.25-1.97,2.12-3.58,2.12-2.74,0-4.61-2-4.61-4.94v-7.17h4.1v6.22c0,1.79.72,2.56,1.87,2.56,1.38,0,2.05-.87,2.05-3.15v-5.63h4.1v11.78h-3.92Z" />
        <path d="m104.65,15.15c-2.07,0-2.89.97-2.89,3.33v5.38h-4.1v-11.78h3.92v1.97c.72-1.48,1.95-2.3,3.76-2.3.36,0,.72.03,1.02.08v3.56c-.49-.13-1.08-.23-1.72-.23Z" />
        <path d="m109.64,18.81c.28,1.61,1.28,2.3,2.64,2.3.95,0,1.74-.31,2.36-.92l2.25,2.3c-1.02,1.02-2.41,1.69-4.69,1.69-4.07,0-6.66-2.51-6.66-6.22,0-3.33,2.38-6.22,5.97-6.22s5.56,2.07,5.56,6.15v.92h-7.42Zm3.58-2.64c0-1.1-.54-1.72-1.71-1.72-.9,0-1.56.59-1.84,1.9h3.56v-.18Z" />
        <path d="m117.71,23.85v-4.28h4.28v4.28h-4.28Z" />
      </g>
    </svg>
  );
});
