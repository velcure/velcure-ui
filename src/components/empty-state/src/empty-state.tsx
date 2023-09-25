import { ButtonGroup } from '#/components/button/src';
import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { EmptyStateDescription } from './empty-state-description';
import { EmptyStateIcon } from './empty-state-icon';
import { EmptyStateTitle } from './empty-state-title';

export interface EmptyStateProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  icon?: React.ReactElement;
  /**
   * The title to be used in the empty state.
   */
  title?: React.ReactNode;
  /**
   * The description to be used in the empty state.
   */
  description?: React.ReactNode;
  /**
   * Actions to be used in the empty state.
   */
  actions?: React.ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (props, ref) => {
    const { icon, className, title, description, children, actions, ...rest } =
      props;

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-1 flex-col items-center justify-center gap-6',
          className
        )}
        {...rest}
      >
        {icon && <EmptyStateIcon>{icon}</EmptyStateIcon>}
        <div className="max-w-[420px] flex flex-col items-center justify-center">
          {title && <EmptyStateTitle>{title}</EmptyStateTitle>}
          {description && (
            <EmptyStateDescription>{description}</EmptyStateDescription>
          )}
        </div>
        {children}
        {actions && (
          <ButtonGroup size="sm" className="">
            {actions}
          </ButtonGroup>
        )}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
