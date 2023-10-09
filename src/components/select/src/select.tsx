import { HTMLVelcureProps, velcure } from '#/components/factory';
import {
  FormControlOptions,
  useFormControl,
} from '#/components/form-control/src';
import { PropsOf, cn, dataAttr } from '#/utilities';
import { VariantProps, cva } from 'class-variance-authority';
import { cloneElement, forwardRef, isValidElement } from 'react';
import { SelectField, SelectFieldProps } from './select-field';

interface RootProps extends Omit<HTMLVelcureProps<'div'>, 'color'> {}

interface SelectOptions extends FormControlOptions {
  size?: 'xs' | 'sm' | 'md' | 'lg' | null | undefined;
  /**
   * The placeholder for the select. We render an `<option/>` element that has
   * empty value.
   *
   * ```jsx
   * <option value="">{placeholder}</option>
   * ```
   */
  placeholder?: string;
}

export interface SelectProps
  extends SelectFieldProps,
    SelectOptions,
    VariantProps<typeof fieldClasses> {
  /**
   * Props to forward to the root `div` element
   */
  rootProps?: RootProps;
  /**
   * The icon element to use in the select
   * @type React.ReactElement
   */
  icon?: React.ReactElement<any>;
}

const fieldClasses = cva(
  [
    'appearance-none leading-normal bg-background',
    'pe-8 ps-4 w-full relative transition-colors',
    'ring-1 ring-input ring-inset',
    'focus-visible:outline-none focus:ring-2 focus:ring-ring',
    //disabled
    'disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-muted',
    // invalid
    'aria-invalid:ring-destructive aria-invalid:focus:ring-destructive',
  ],
  {
    variants: {
      size: {
        xs: 'h-6 rounded-sm text-xs',
        sm: 'h-8 rounded-sm text-sm',
        md: 'h-10 rounded-md text-sm',
        lg: 'h-12 rounded-md text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/**
 * React component used to select one item from a list of options.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const { rootProps, placeholder, icon, className, size, ...restProps } =
      props;

    const ownProps = useFormControl(restProps);

    return (
      <velcure.div className={cn('w-full h-fit relative')} {...rootProps}>
        <SelectField
          ref={ref}
          placeholder={placeholder}
          {...ownProps}
          className={cn(fieldClasses({ size }), className)}
        >
          {props.children}
        </SelectField>

        <SelectIcon data-disabled={dataAttr(ownProps.disabled)}>
          {icon}
        </SelectIcon>
      </velcure.div>
    );
  }
);

Select.displayName = 'Select';

export const DefaultIcon: React.FC<PropsOf<'svg'>> = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
    />
  </svg>
);

interface SelectIconProps extends HTMLVelcureProps<'div'> {}

const SelectIcon: React.FC<SelectIconProps> = (props) => {
  const { children = <DefaultIcon />, className, ...rest } = props;

  const clone = cloneElement(children as any, {
    role: 'presentation',
    focusable: false,
    'aria-hidden': true,
    // force icon to adhere to `IconWrapper` styles
    style: {
      width: '1em',
      height: '1em',
      color: 'currentColor',
    },
  });

  return (
    <velcure.div
      {...rest}
      className={cn(
        'h-full w-6 text-current absolute inline-flex items-center justify-center',
        'pointer-events-none end-2',
        className
      )}
    >
      {isValidElement(children) ? clone : null}
    </velcure.div>
  );
};

SelectIcon.displayName = 'SelectIcon';
