import { IconButton, Tooltip, Typography } from '#/components';
import { cn } from '#/utilities';
import { cva } from 'class-variance-authority';
import React, { forwardRef } from 'react';
import { usePageContext } from './use-page';

export interface PageHeaderProps
  extends Omit<React.ComponentPropsWithoutRef<'header'>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

const classes = cva([
  'flex items-center justify-stretch px-4 border-b bg-background shadow min-h-14 relative w-full',
]);

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  (props, ref) => {
    const { className, title, description, actions, ...rest } = props;

    const { onBack } = usePageContext();

    return (
      <header ref={ref} className={className} {...rest}>
        <div className={cn(classes())}>
          <div className={cn('flex w-full flex-row items-center')}>
            {Boolean(onBack) && (
              <IconButton
                variant="ghost"
                className="me-2"
                size="sm"
                aria-label="Back"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-4 h-4"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
              </IconButton>
            )}
            {(title || description) && (
              <div className="flex flex-row items-center gap-2">
                {typeof title === 'string' ? (
                  <Typography variant="h2" className="text-sm font-semibold">
                    {title}
                  </Typography>
                ) : (
                  title
                )}
                {description && (
                  <Tooltip content={description}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="h-4 w-4 cursor-help text-current"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <path d="M12 17h.01" />
                    </svg>
                  </Tooltip>
                )}
              </div>
            )}

            {actions && (
              <div className="flex flex-row gap-2 ms-auto">{actions}</div>
            )}
          </div>
        </div>
      </header>
    );
  }
);

PageHeader.displayName = 'PageHeader';
