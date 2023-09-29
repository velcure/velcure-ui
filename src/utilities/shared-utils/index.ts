import { clsx, type ClassValue } from 'clsx';
import { Children, forwardRef as forwardReactRef, isValidElement } from 'react';
import { twMerge } from 'tailwind-merge';
import { As, ComponentWithAs, PropsOf, RightJoinProps } from '../react-types';

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;
export type Assign<T, U> = DistributiveOmit<T, keyof U> & U;

function isDev() {
  return process.env.NODE_ENV !== 'production';
}

export function isObject(value: any): value is Record<string, any> {
  const type = typeof value;
  return (
    value != null &&
    (type === 'object' || type === 'function') &&
    !Array.isArray(value)
  );
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Booleanish = boolean | 'true' | 'false';

export const dataAttr = (condition: boolean | undefined) =>
  (condition ? '' : undefined) as Booleanish;

export const ariaAttr = (condition: boolean | undefined) =>
  condition ? true : undefined;

type Args<T extends Function> = T extends (...args: infer R) => any ? R : never;

type AnyFunction<T = any> = (...args: T[]) => any;

export function callAllHandlers<T extends (event: any) => void>(
  ...fns: (T | undefined)[]
) {
  return function func(event: Args<T>[0]) {
    fns.some((fn) => {
      fn?.(event);
      return event?.defaultPrevented;
    });
  };
}

export function callAll<T extends AnyFunction>(...fns: (T | undefined)[]) {
  return function mergedFn(arg: Args<T>[0]) {
    fns.forEach((fn) => {
      fn?.(arg);
    });
  };
}

type MessageOptions = {
  condition: boolean;
  message: string;
};

export const warn = (options: MessageOptions) => {
  const { condition, message } = options;
  if (condition && isDev()) {
    console.warn(message);
  }
};

export function runIfFn<T, U>(
  valueOrFn: T | ((...fnArgs: U[]) => T),
  ...args: U[]
): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}

const isFunction = <T extends Function = Function>(value: any): value is T =>
  typeof value === 'function';

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */
export function getValidChildren(children: React.ReactNode) {
  return Children.toArray(children).filter((child) =>
    isValidElement(child)
  ) as React.ReactElement[];
}

export function forwardRef<Props extends object, Component extends As>(
  component: React.ForwardRefRenderFunction<
    any,
    RightJoinProps<PropsOf<Component>, Props> & {
      as?: As;
    }
  >
) {
  return forwardReactRef(component) as unknown as ComponentWithAs<
    Component,
    Props
  >;
}

export function initials(name: string) {
  const names = name.split(' ');
  const firstName = names[0] ?? '';
  const lastName = names.length > 1 ? names[names.length - 1] : '';

  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  }

  if (firstName) {
    return firstName.slice(0, 2);
  }

  return '';
}

export function clamp(
  value: number,
  min: number | undefined,
  max: number | undefined
) {
  if (min === undefined && max === undefined) {
    return value;
  }

  if (min !== undefined && max === undefined) {
    return Math.max(value, min);
  }

  if (min === undefined && max !== undefined) {
    return Math.min(value, max);
  }

  return Math.min(Math.max(value, min!), max!);
}
