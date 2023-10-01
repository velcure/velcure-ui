import { As, composeRefs } from '#/utilities';
import { mergeProps } from '@zag-js/core';
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ComponentPropsWithoutRef,
} from 'react';

type JsxElements = {
  [E in keyof JSX.IntrinsicElements]: VelcureForwardRefComponent<E>;
};
type VelcureForwardRefComponent<E extends React.ElementType> =
  React.ForwardRefExoticComponent<VelcurePropsWithRef<E>>;
type VelcurePropsWithRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E> & {
    asChild?: boolean;
    as?: As;
  };

const withAsChild = (Component: React.ElementType) => {
  const Comp = forwardRef<unknown, VelcurePropsWithRef<typeof Component>>(
    (props, ref) => {
      const { asChild, as: As, children, ...restProps } = props;

      if (!asChild && !As) {
        return <Component {...props} ref={ref} />;
      }

      if (As) {
        return (
          <As {...restProps} ref={ref}>
            {children}
          </As>
        );
      }

      const onlyChild = Children.only(children);

      return isValidElement(onlyChild)
        ? cloneElement(onlyChild, {
            ...mergeProps(restProps, onlyChild.props as any),
            ref: ref
              ? composeRefs(ref, (onlyChild as any).ref)
              : (onlyChild as any).ref,
          })
        : null;
    }
  );

  // @ts-expect-error - it exists
  Comp.displayName = Component.displayName || Component.name;

  return Comp;
};

export type HTMLVelcureProps<T extends keyof JSX.IntrinsicElements> =
  ComponentPropsWithoutRef<T> & {
    /**
     * Render as a different element type.
     */
    asChild?: boolean;
    as?: As;
  };

export const jsxFactory = () => {
  const cache = new Map();

  return new Proxy(withAsChild, {
    apply(_target, _thisArg, argArray) {
      return withAsChild(argArray[0]);
    },
    get(_, element) {
      const asElement = element as React.ElementType;
      if (!cache.has(asElement)) {
        cache.set(asElement, withAsChild(asElement));
      }
      return cache.get(asElement);
    },
  }) as unknown as JsxElements;
};

export const velcure = jsxFactory();
