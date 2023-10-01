import { HTMLVelcureProps, velcure } from '#/components/factory';
import { Assign, cn, createSplitProps, runIfFn } from '#/utilities';
import { mergeProps } from '@zag-js/react';
import { ReactNode, forwardRef } from 'react';
import { SplitterProvider } from './splitter-context';
import {
  UseSplitterProps,
  UseSplitterReturn,
  useSplitter,
} from './use-splitter';

export interface SplitterProps
  extends Assign<
    HTMLVelcureProps<'div'>,
    UseSplitterProps & {
      children?: ReactNode | ((state: UseSplitterReturn) => ReactNode);
    }
  > {}

export const Splitter = forwardRef<HTMLDivElement, SplitterProps>(
  (props, ref) => {
    const [useSplitterProps, { children, ...divProps }] =
      createSplitProps<UseSplitterProps>()(props, [
        'defaultSize',
        'dir',
        'getRootNode',
        'id',
        'ids',
        'onSizeChange',
        'onSizeChangeEnd',
        'onSizeChangeStart',
        'orientation',
        'size',
      ]);

    const api = useSplitter(useSplitterProps);
    const mergedProps = mergeProps(api.rootProps, divProps);
    const view = runIfFn(children, api);

    return (
      <SplitterProvider value={api}>
        <velcure.div
          {...mergedProps}
          ref={ref}
          className={cn('flex gap-2 min-h-[300px]', mergedProps.className)}
        >
          {view}
        </velcure.div>
      </SplitterProvider>
    );
  }
);

Splitter.displayName = 'Splitter';
