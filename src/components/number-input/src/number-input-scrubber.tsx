import { mergeProps } from '@zag-js/react';
import { forwardRef } from 'react';
import { velcure, type HTMLVelcureProps } from '../../factory';
import { useNumberInputContext } from './use-number-input';

export interface NumberInputScrubberProps extends HTMLVelcureProps<'div'> {}

export const NumberInputScrubber = forwardRef<
  HTMLDivElement,
  NumberInputScrubberProps
>((props, ref) => {
  const api = useNumberInputContext();
  const mergedProps = mergeProps(api.scrubberProps, props);

  return <velcure.div {...mergedProps} ref={ref} />;
});

NumberInputScrubber.displayName = 'NumberInputScrubber';
