import { runIfFn } from '#/utilities';
import { ReactNode, useMemo, useRef } from 'react';
import { EnvironmentProvider } from './environment-context';

export type RootNode = ShadowRoot | Document | Node;

export interface EnvironmentProps {
  children?: ReactNode;
  value?: RootNode | (() => RootNode);
}

export const Environment = (props: EnvironmentProps) => {
  const { value, children } = props;
  const ref = useRef<HTMLSpanElement>(null);

  const getRootNode = useMemo(() => {
    return () => runIfFn(value) ?? ref.current?.ownerDocument ?? document;
  }, [value]);

  const showSpan = !value;

  return (
    <EnvironmentProvider value={getRootNode}>
      {children}
      {showSpan && <span data-velcure-env="" hidden ref={ref} />}
    </EnvironmentProvider>
  );
};
