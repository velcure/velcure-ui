import { cn, dataAttr } from '#/utilities/shared-utils';
import { ComponentPropsWithoutRef, forwardRef, useMemo } from 'react';
import { ButtonGroupContext, ButtonGroupProvider } from './button-context';
import { ButtonGroupOptions } from './button-types';

export interface ButtonGroupProps
  extends ComponentPropsWithoutRef<'div'>,
    ButtonGroupOptions {}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (props, ref) => {
    const {
      isAttached,
      isDisabled,
      orientation = 'horizontal',
      className,
      size,
      ...restProps
    } = props;

    const isVertical = orientation === 'vertical';

    const context: ButtonGroupContext = useMemo(
      () => ({
        isDisabled,
        size,
      }),
      [isDisabled, size]
    );

    return (
      <ButtonGroupProvider value={context}>
        <div
          ref={ref}
          role="group"
          className={cn(
            'inline-flex',
            isVertical ? 'flex-col' : 'flex-row',
            isAttached
              ? '[&>*:first-of-type:not(:last-of-type)]:rounded-e-none > [&>*:not(:first-of-type):not(:last-of-type)]:rounded-none [&>*:not(:first-of-type):last-of-type]:rounded-s-none'
              : 'gap-2',
            className
          )}
          data-attached={dataAttr(isAttached)}
          data-orientation={orientation}
          {...restProps}
        />
      </ButtonGroupProvider>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';
