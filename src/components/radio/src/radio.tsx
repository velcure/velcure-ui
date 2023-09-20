import { callAllHandlers } from '#/utilities';
import { cva } from 'class-variance-authority';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { useRadioGroupContext } from './radio-group';
import { UseRadioProps, useRadio } from './use-radio';

type Omitted = 'onChange' | 'defaultChecked' | 'checked';
interface BaseControlProps
  extends Omit<ComponentPropsWithoutRef<'div'>, Omitted> {}

export interface RadioProps extends UseRadioProps, BaseControlProps {
  /**
   * Additional props to be forwarded to the `input` element
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const controlClass = cva(
  [
    'inline-flex items-center justify-center shrink-0',
    'transition-shadow border-2 border-solid border-inherit',

    // experimental
    'aspect-square rounded-full border border-primary text-primary',
    'ring-offset-background focus:outline-none',
    'data-focus-visible:ring-2 data-focus-visible:ring-ring data-focus-visible:ring-offset-2',

    'data-readonly:cursor-not-allowed data-readonly:opacity-50',
    // checked state
    // 'data-checked:bg-blue-500 data-checked:border-blue-500 data-checked:text-white',
  ],
  {
    variants: {
      size: {
        md: 'h-4 w-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/**
 * Radio component is used in forms when a user needs to select a single value from
 * several options.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const group = useRadioGroupContext();

  const {
    onChange: onChangeProp,
    value: valueProp,
    children,
    isDisabled = group?.isDisabled,
    isFocusable = group?.isFocusable,
    inputProps: htmlInputProps,
    className,
    ...rest
  } = props;

  let isChecked = props.isChecked;
  if (group?.value != null && valueProp != null) {
    isChecked = group.value === valueProp;
  }

  let onChange = onChangeProp;
  if (group?.onChange && valueProp != null) {
    onChange = callAllHandlers(group.onChange, onChangeProp);
  }

  const name = props?.name ?? group?.name;

  const {
    state,
    getInputProps,
    getRadioProps,
    getLabelProps,
    getRootProps,
    htmlProps,
  } = useRadio({
    ...rest,
    value: valueProp,
    isChecked,
    isFocusable,
    isDisabled,
    onChange,
    name,
  });

  const checkboxProps = getRadioProps(htmlProps);
  const inputProps = getInputProps(htmlInputProps, ref);
  const labelProps = getLabelProps();
  const rootProps = Object.assign({}, getRootProps());

  return (
    <label
      className="inline-flex items-center align-top cursor-pointer relative data-disabled:cursor-not-allowed data-disabled:opacity-50"
      {...rootProps}
    >
      <input {...inputProps} className="peer" />
      <span className={controlClass()} {...checkboxProps}>
        {state.isChecked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-2.5 w-2.5 fill-current text-current"
          >
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        )}
      </span>
      {children && (
        <span
          {...labelProps}
          className="select-none ms-2 text-sm font-medium leading-none"
        >
          {children}
        </span>
      )}
    </label>
  );
});

Radio.displayName = 'Radio';
