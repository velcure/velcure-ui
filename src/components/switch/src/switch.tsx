import { HTMLVelcureProps, velcure } from '#/components/factory';
import { Assign, cn, createSplitProps } from '#/utilities';
import { forwardRef } from 'react';
import { UseSwitchProps, useSwitch } from './use-switch';

export interface SwitchProps
  extends Assign<HTMLVelcureProps<'input'>, UseSwitchProps> {}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (props, ref) => {
    const [switchProps, { children, className, ...restProps }] =
      createSplitProps<UseSwitchProps>()(props, [
        'checked',
        'defaultChecked',
        'dir',
        'disabled',
        'form',
        'getRootNode',
        'id',
        'ids',
        'invalid',
        'label',
        'name',
        'onCheckedChange',
        'required',
        'value',
      ]);

    const api = useSwitch(switchProps);

    return (
      <velcure.label
        {...api.rootProps}
        className={cn('flex relative items-center')}
      >
        <velcure.input {...api.hiddenInputProps} ref={ref} />
        <velcure.span
          {...api.controlProps}
          className={cn(
            'relative inline-flex shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
            // focus
            'data-focus:outline-none data-focus:ring-2 data-focus:ring-ring data-focus:ring-offset-2',
            // colors
            api.isChecked ? 'bg-primary' : 'bg-muted',
            // size
            'h-6 w-11',
            // enabled
            'cursor-pointer'
          )}
        >
          <velcure.span
            {...api.thumbProps}
            className={cn(
              'pointer-events-none relative inline-block transform rounded-full shadow ring-0 transition duration-200 ease-in-out',
              'bg-background z-[1]',
              // size
              'h-5 w-5',
              api.isChecked ? 'translate-x-5' : 'translate-x-0'
            )}
          >
            <velcure.span
              className={cn(
                api.isChecked
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
                api.isChecked
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
        <velcure.span {...api.labelProps}>{children}</velcure.span>
      </velcure.label>
    );
  }
);

Switch.displayName = 'Switch';
