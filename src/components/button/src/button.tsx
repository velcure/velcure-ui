import { useMergeRefs, useRipple } from '#/hooks';
import { cn, dataAttr, forwardRef } from '#/utilities/shared-utils';
import { VariantProps, cva } from 'class-variance-authority';
import { ComponentPropsWithoutRef } from 'react';
import { useButtonGroup } from './button-context';
import { ButtonIcon } from './button-icon';
import { ButtonSpinner } from './button-spinner';
import { ButtonOptions } from './button-types';
import { useButtonType } from './use-button-type';

export interface ButtonProps
  extends ComponentPropsWithoutRef<'button'>,
    ButtonOptions,
    VariantProps<typeof buttonClasses> {}

const buttonClasses = cva(
  [
    'font-sans font-normal align-middle appearance-none select-none',
    'inline-flex items-center justify-center relative whitespace-nowrap',
    'rounded-md transition-colors outline-none',
    'focus-visible:shadow-none',
    'disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none',
    'overflow-hidden',
    'ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring',
  ],
  {
    variants: {
      variant: {
        primary: cn([
          'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80',
          'hover:disabled:bg-primary',
        ]),
        secondary: cn([
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70',
          'hover:disabled:bg-secondary',
        ]),
        destructive: cn([
          'bg-destructive text-destructive-foreground hover:bg-destructive/80 active:bg-destructive/70',
        ]),
        outline: cn([
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ]),
        ghost: cn(['hover:bg-accent hover:text-accent-foreground']),
        link: cn(['text-primary underline-offset-4 hover:underline']),
        unstyled: '',
      },
      size: {
        xs: 'h-6 min-w-6 text-xs px-2',
        sm: 'h-8 min-w-8 text-sm px-3',
        md: 'h-10 min-w-10 text-md px-4',
        lg: 'h-12 min-w-12 text-lg px-6',
      },
    },
    compoundVariants: [],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export const Button = forwardRef<ButtonProps, 'button'>((props, ref) => {
  const group = useButtonGroup();

  const {
    isDisabled = group?.isDisabled,
    isLoading,
    type,
    className,
    spinnerPlacement = 'start',
    loadingText,
    rightIcon,
    leftIcon,
    children,
    spinner,
    variant,
    size = group?.size,
    as: As = 'button',
    ...restProps
  } = props;

  const { getButtonProps, ripples } = useRipple();

  const contentProps = { rightIcon, leftIcon, children };

  const { ref: _ref, type: defaultType } = useButtonType(As);

  return (
    <As
      type={type ?? defaultType}
      data-loading={dataAttr(isLoading)}
      className={cn(
        buttonClasses({
          variant,
          size,
        }),
        !!group && 'focus:z-[1]',
        className
      )}
      {...getButtonProps(restProps, useMergeRefs(ref, _ref))}
      disabled={isDisabled || isLoading}
    >
      {ripples}
      {isLoading && spinnerPlacement === 'start' && (
        <ButtonSpinner placement="start" label={loadingText}>
          {spinner}
        </ButtonSpinner>
      )}
      {isLoading ? (
        loadingText || (
          <span className="opacity-0">
            <ButtonContent {...contentProps} />
          </span>
        )
      ) : (
        <ButtonContent {...contentProps} />
      )}

      {isLoading && spinnerPlacement === 'end' && (
        <ButtonSpinner placement="end" label={loadingText}>
          {spinner}
        </ButtonSpinner>
      )}
    </As>
  );
});

type ButtonContentProps = Pick<
  ButtonProps,
  'leftIcon' | 'rightIcon' | 'children'
>;

const ButtonContent: React.FC<ButtonContentProps> = (props) => {
  const { leftIcon, rightIcon, children } = props;
  return (
    <>
      {leftIcon && <ButtonIcon className="me-2">{leftIcon}</ButtonIcon>}
      {children}
      {rightIcon && <ButtonIcon className="ms-2">{rightIcon}</ButtonIcon>}
    </>
  );
};
