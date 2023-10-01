import { HTMLVelcureProps, velcure } from '#/components/factory';
import { Assign, cn, createSplitProps } from '#/utilities';
import { mergeProps } from '@zag-js/react';
import { type ResizeTriggerProps } from '@zag-js/splitter';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { useSplitterContext } from './splitter-context';

export interface SplitterResizeTriggerProps
  extends Assign<HTMLVelcureProps<'button'>, ResizeTriggerProps> {}

const splitterResizeTriggerStyle = cva(
  ['rounded-full transition-colors outline-none bg-primary'],
  {
    variants: {
      direction: {
        horizontal: 'min-w-[6px] my-4',
        vertical: 'w-full h-2',
      },
    },
    defaultVariants: {
      direction: 'horizontal',
    },
  }
);

export const SplitterResizeTrigger = forwardRef<
  HTMLButtonElement,
  SplitterResizeTriggerProps
>((props, ref) => {
  const [triggerProps, restProps] = createSplitProps<ResizeTriggerProps>()(
    props,
    ['disabled', 'id', 'step']
  );
  const api = useSplitterContext();
  const mergedProps = mergeProps(
    api.getResizeTriggerProps(triggerProps),
    restProps
  );

  return (
    <velcure.button
      ref={ref}
      {...mergedProps}
      className={cn(splitterResizeTriggerStyle(), mergedProps.className)}
    />
  );
});

SplitterResizeTrigger.displayName = 'SplitterResizeTrigger';
