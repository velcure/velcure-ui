import { HTMLVelcureProps, velcure } from '#/components/factory';
import { forwardRef } from 'react';

export interface THeadRowProps extends HTMLVelcureProps<'tr'> {}

export const THeadRow = forwardRef<HTMLTableRowElement, THeadRowProps>(
  (props, ref) => {
    return <velcure.tr {...props} ref={ref} />;
  }
);

THeadRow.displayName = 'THeadRow';
