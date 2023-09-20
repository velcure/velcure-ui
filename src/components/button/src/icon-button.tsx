import { cn } from '#/utilities';
import { cloneElement, forwardRef, isValidElement } from 'react';
import { Button, ButtonProps } from './button';

type OmittedProps =
  | 'leftIcon'
  | 'rightIcon'
  | 'loadingText'
  | 'spinnerPlacement';

interface BaseButtonProps extends Omit<ButtonProps, OmittedProps> {}

export interface IconButtonProps extends BaseButtonProps {
  /**
   * The icon to be used in the button.
   * @type React.ReactElement
   */
  icon?: React.ReactElement;
  /**
   * If `true`, the button will be perfectly round. Else, it'll be slightly round
   *
   * @default false
   */
  isRound?: boolean;
  /**
   * A11y: A label that describes the button
   */
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const {
      icon,
      children,
      isRound,
      'aria-label': ariaLabel,
      className,
      ...restProps
    } = props;

    /**
     * Passing the icon as prop or children should work
     */
    const element = icon || children;
    const _children = isValidElement(element)
      ? cloneElement(element as any, {
          'aria-hidden': true,
          focusable: false,
        })
      : null;

    return (
      <Button
        className={cn('p-0', isRound ? 'rounded-full' : undefined, className)}
        ref={ref}
        aria-label={ariaLabel}
        {...restProps}
      >
        {_children}
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';
