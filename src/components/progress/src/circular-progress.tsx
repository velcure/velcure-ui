import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import React from 'react';
import { Circle } from './circle';
import { getProgressProps } from './progress.utils';
import { Shape } from './shape';

export interface CircularProgressProps extends HTMLVelcureProps<'div'> {
  /**
   * Maximum value defining 100% progress made (must be higher than 'min')
   * @default 100
   */
  max?: number;
  /**
   * Minimum value defining 'no progress' (must be lower than 'max')
   * @default 0
   */
  min?: number;
  /**
   * Current progress (must be between min/max)
   */
  value?: number;
  /**
   * This defines the stroke width of the svg circle.
   * @default "10px"
   */
  thickness?: string | number;
  /**
   * If `true`, the cap of the progress indicator will be rounded.
   *
   * @default false
   */
  capIsRound?: boolean;
  /**
   * The color of the progress indicator. Use a tailwind color class.
   */
  color?: string;
  /**
   * If `true`, the progress will be indeterminate and the `value`
   * prop will be ignored
   *
   * @default false
   */
  isIndeterminate?: boolean;
  /**
   * The desired valueText to use in place of the value
   */
  valueText?: string;
  /**
   * A function that returns the desired valueText to use in place of the value
   */
  getValueText?(value: number, percent: number): string;
  /**
   * The color name of the progress track. Use a tailwind color class.
   */
  trackColor?: string;
}

export const CircularProgress = React.forwardRef<
  HTMLDivElement,
  CircularProgressProps
>((props, ref) => {
  const {
    className,
    children,
    min = 0,
    max = 100,
    thickness = '10px',
    capIsRound,
    color,
    isIndeterminate,
    value,
    valueText,
    getValueText,
    trackColor = 'stroke-muted',
    ...restProps
  } = props;

  const progress = getProgressProps({
    min,
    max,
    value,
    valueText,
    getValueText,
    isIndeterminate,
  });

  const determinant = isIndeterminate
    ? undefined
    : (progress.percent ?? 0) * 2.64;

  const strokeDasharray =
    determinant == null ? undefined : `${determinant} ${264 - determinant}`;

  return (
    <velcure.div
      ref={ref}
      className={cn(
        'inline-block relative align-middle text-[120px]',
        className
      )}
      {...restProps}
    >
      <Shape isIndeterminate={isIndeterminate}>
        <Circle
          className={trackColor}
          strokeWidth={thickness}
          fill="transparent"
        />
        <Circle
          strokeWidth={thickness}
          strokeLinecap={capIsRound ? 'round' : undefined}
          stroke="red"
          className={cn(
            color ?? 'stroke-primary',
            isIndeterminate ? 'animate-circle-spin' : 'transition-all'
          )}
          {...(!isIndeterminate && {
            strokeDashoffset: 66,
            strokeDasharray,
          })}
        />
      </Shape>
      {children}
    </velcure.div>
  );
});

CircularProgress.displayName = 'CircularProgress';
