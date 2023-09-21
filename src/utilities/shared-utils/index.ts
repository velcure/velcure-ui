import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
