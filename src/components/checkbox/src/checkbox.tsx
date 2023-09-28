import { HTMLVelcureProps, velcure } from '#/components/factory';
import { PropsOf, callAll, cn } from '#/utilities';
import { cva } from 'class-variance-authority';
import { cloneElement, forwardRef } from 'react';
import { CheckboxIcon } from './checkbox-icon';
import { UseCheckboxProps, useCheckbox } from './use-checkbox';
import { useCheckboxGroupContext } from './use-checkbox-group';

export type CheckboxOptions = {
  /**
   * The checked icon to use
   *
   * @type React.ReactElement
   * @default CheckboxIcon
   */
  icon?: React.ReactElement;
  /**
   * Additional props to be forwarded to the `input` element
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * The size of the checkbox
   * @default md
   */
  size?: 'sm' | 'md' | 'lg';
};

type CheckboxControlProps = Omit<
  HTMLVelcureProps<'div'>,
  keyof UseCheckboxProps
>;

type BaseInputProps = Pick<
  PropsOf<'input'>,
  'onBlur' | 'checked' | 'defaultChecked'
>;

export interface CheckboxProps
  extends CheckboxControlProps,
    BaseInputProps,
    UseCheckboxProps,
    CheckboxOptions {}

const iconStyles = cva('transition-transform', {
  variants: {
    isIndeterminate: {
      true: ' animate-interminate',
      false: 'animate-check',
    },
    size: {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    },
  },
  defaultVariants: {
    isIndeterminate: false,
    size: 'md',
  },
});

const controlStyles = cva(
  [
    'inline-flkex items-center justify-center align-top select-none shrink-0',
    'transition-shadow',
    'rounded-md border border-input',
    'bg-background ring-1 ring-input',
    'data-focus:ring-2 data-focus:ring-ring',
    // checked
    'data-checked:bg-primary data-checked:text-primary-foreground',
    'data-checked:hover:bg-primary/70 data-checked:hover:text-primary-foreground/90',
    // indeterminate
    'data-indeterminate:bg-primary data-indeterminate:text-primary-foreground',
    'data-indeterminate:hover:bg-primary/70 data-indeterminate:hover:text-primary-foreground/90',
    // disabled
    'data-disabled:opacity-70 data-disabled:bg-muted',
    // invalid
    'data-invalid:ring-destructive data-invalid:focus:ring-destructive',
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const labelStyles = cva(['select-none ms-2', 'data-disabled:opacity-70'], {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const group = useCheckboxGroupContext();
    const mergedProps = { ...group, ...props } as CheckboxProps;

    const {
      className,
      children,
      icon = <CheckboxIcon />,
      isChecked: isCheckedProp,
      isDisabled = group?.isDisabled,
      onChange: onChangeProp,
      inputProps,
      size = 'md',
      ...rest
    } = mergedProps;

    let isChecked = isCheckedProp;
    if (group?.value && mergedProps.value) {
      isChecked = group.value.includes(mergedProps.value);
    }

    let onChange = onChangeProp;
    if (group?.onChange && mergedProps.value) {
      onChange = callAll(group.onChange, onChangeProp);
    }

    const {
      state,
      getInputProps,
      getCheckboxProps,
      getLabelProps,
      getRootProps,
    } = useCheckbox({
      ...rest,
      isDisabled,
      isChecked,
      onChange,
    });

    const clonedIcon = cloneElement(icon, {
      className: iconStyles({
        isIndeterminate: !!state.isIndeterminate,
        size,
      }),
      isIndeterminate: state.isIndeterminate,
      isChecked: state.isChecked,
    });

    return (
      <velcure.label
        className={cn(
          'cursor-pointer inline-flex items-center align-top relative data-disabled:cursor-not-allowed',
          className
        )}
        {...getRootProps()}
      >
        <velcure.input {...getInputProps(inputProps, ref)} />
        <velcure.span
          {...getCheckboxProps({
            className: controlStyles({
              size,
            }),
          })}
        >
          {clonedIcon}
        </velcure.span>
        {children && (
          <velcure.span
            {...getLabelProps({
              className: labelStyles({
                size,
              }),
            })}
          >
            {children}
          </velcure.span>
        )}
      </velcure.label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
