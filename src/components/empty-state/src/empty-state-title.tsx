import { cn } from '#/utilities';
import React from 'react';

export interface EmptyStateTitleProps extends React.ComponentProps<'div'> {}

export const EmptyStateTitle: React.FC<EmptyStateTitleProps> = (props) => {
  const { className, children, ...rest } = props;
  return (
    <div
      className={cn(
        'text-2xl font-semibold tracking-tight scroll-m-20',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
