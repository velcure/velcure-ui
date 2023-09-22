import { cn, compact, getValidChildren } from '#/utilities';
import { ComponentPropsWithoutRef, cloneElement, forwardRef } from 'react';
import type { InputProps } from './input';

export interface InputGroupProps
  extends ComponentPropsWithoutRef<'div'>,
    Pick<InputProps, 'size'> {}

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  (props, ref) => {
    const { children, className, size, ...restProps } = props;

    const validChildren = getValidChildren(children);

    let leftElementsCount = 0;
    let rightElementsCount = 0;

    validChildren.forEach((child: any) => {
      if (child.type.displayName === 'InputLeftElement') {
        leftElementsCount++;
      }
      if (child.type.displayName === 'InputRightElement') {
        rightElementsCount++;
      }
    });

    const clones = validChildren.map((child: any) => {
      const theming = compact({
        size: child.props.size ?? size,
      });

      return child.type.displayName !== 'Input'
        ? cloneElement(child, theming)
        : cloneElement(
            child,
            Object.assign(theming, {
              style: {
                ...(leftElementsCount && {
                  paddingInlineStart: `${leftElementsCount * 36}px`,
                }),
                ...(rightElementsCount && {
                  paddingInlineEnd: `${rightElementsCount * 36}px`,
                }),
              },
            })
          );
    });

    return (
      <div
        ref={ref}
        className={cn('w-full flex relative isolate', className)}
        {...restProps}
      >
        {clones}
      </div>
    );
  }
);

InputGroup.displayName = 'InputGroup';
