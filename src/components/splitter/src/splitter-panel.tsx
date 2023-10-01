import { HTMLVelcureProps, velcure } from '#/components/factory';
import { Assign, createSplitProps } from '#/utilities';
import { mergeProps } from '@zag-js/react';
import { type PanelProps } from '@zag-js/splitter';
import { forwardRef } from 'react';
import { useSplitterContext } from './splitter-context';

export interface SplitterPanelProps
  extends Assign<HTMLVelcureProps<'div'>, PanelProps> {}

export const SplitterPanel = forwardRef<HTMLDivElement, SplitterPanelProps>(
  (props, ref) => {
    const [splitterPanelProps, divProps] = createSplitProps<PanelProps>()(
      props,
      ['id', 'snapSize']
    );
    const api = useSplitterContext();
    const mergedProps = mergeProps(
      api.getPanelProps(splitterPanelProps),
      divProps
    );

    return <velcure.div {...mergedProps} ref={ref} />;
  }
);

SplitterPanel.displayName = 'SplitterPanel';
