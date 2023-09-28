import { UseCheckboxProps, useCheckbox } from '#/components/checkbox/src';
import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';

export interface SwitchProps
  extends Omit<UseCheckboxProps, 'isIndeterminate'>,
    Omit<HTMLVelcureProps<'input'>, keyof UseCheckboxProps> {}

const checkboxStyle = cva(
  [
    'relative inline-flex shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
    'cursor-pointer bg-muted',
    // checked
    'data-checked:bg-primary',
    // focus
    'data-focus:outline-none data-focus:ring-2 data-focus:ring-ring data-focus:ring-offset-2',
    // disabled
    'data-disabled:opacity-70 data-disabled:bg-muted data-disabled:cursor-not-allowed',
    // invalid
    'data-invalid:bg-destructive',
  ],
  {
    variants: {
      size: {
        md: 'h-6 w-11',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const labelStyles = cva(
  ['leading-6 font-medium', 'select-none ms-2 data-disabled:opacity-70'],
  {
    variants: {
      size: {
        md: 'text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/**
 * The `Switch` component is used as an alternative for the checkbox component for switching between "enabled" and "disabled" states.
 *
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/switch/
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;
    const {
      state,
      getIndicatorProps,
      getInputProps,
      getCheckboxProps,
      getRootProps,
      getLabelProps,
    } = useCheckbox(restProps);

    return (
      <velcure.label
        {...getRootProps({
          className: cn('flex relative items-center', className),
        })}
      >
        <velcure.input {...getInputProps({}, ref)} />
        <velcure.span
          {...getCheckboxProps({
            className: cn(checkboxStyle()),
          })}
        >
          <velcure.span
            {...getIndicatorProps({
              className: cn(
                'pointer-events-none relative inline-block transform rounded-full shadow ring-0 transition duration-200 ease-in-out',
                'bg-background z-[1]',
                // size
                'h-5 w-5',
                state.isChecked ? 'translate-x-5' : 'translate-x-0'
              ),
            })}
          >
            <velcure.span
              className={cn(
                state.isChecked
                  ? 'opacity-0 duration-100 ease-out'
                  : 'opacity-100 duration-200 ease-in',
                'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
              )}
              aria-hidden="true"
            >
              <svg
                className="h-3 w-3 text-gray-400"
                fill="none"
                viewBox="0 0 12 12"
              >
                <path
                  d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </velcure.span>
            <velcure.span
              className={cn(
                state.isChecked
                  ? 'opacity-100 duration-200 ease-in'
                  : 'opacity-0 duration-100 ease-out',
                'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
              )}
              aria-hidden="true"
            >
              <svg
                className="h-3 w-3 text-indigo-600"
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
              </svg>
            </velcure.span>
          </velcure.span>
        </velcure.span>
        <velcure.span
          {...getLabelProps({
            className: cn(labelStyles()),
          })}
        >
          {children}
        </velcure.span>
      </velcure.label>
    );
  }
);

Switch.displayName = 'Switch';
