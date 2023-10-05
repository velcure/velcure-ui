import { velcure } from '#/components/factory';
import { cn } from '#/utilities';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { useSchedulerContext } from '../use-scheduler';

interface DayResourcesProps {
  resources?: Array<{
    id: string;
    name: string;
  }>;
}

const containerClass = cva('bg-background sticky', {
  variants: {
    direction: {
      horizontal:
        'top-0 z-30 flex-none  shadow ring-1 ring-black ring-opacity-5 sm:pr-8',
      vertical: cn(
        'left-0 z-20',
        '-ml-14 -mt-2.5 w-14 pr-2 rtl:-mr-14',
        'text-end',
        'text-muted-foreground'
      ),
    },
  },
  defaultVariants: {
    direction: 'horizontal',
  },
});

export const DayResources = forwardRef<HTMLDivElement, DayResourcesProps>(
  (props, ref) => {
    const { resources = [] } = props;
    const total = resources.length;

    const { direction } = useSchedulerContext();

    return (
      <velcure.div
        ref={ref}
        className={cn(
          containerClass({
            direction,
          }),
          'ms-14 flex flex-row'
        )}
      >
        <div
          className="-mr-px hidden divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid"
          style={{
            ...(direction === 'horizontal'
              ? {
                  gridTemplateColumns: `repeat(${total}, 230px)`,
                }
              : {
                  gridTemplateRows: `repeat(${total}, minmax(0, 1fr))`,
                }),
          }}
        >
          {/* <div
            className={
              direction === 'horizontal' ? 'col-end-1 w-14' : 'row-end-1 h-7'
            }
          /> */}
          {resources.map((resource) => (
            <div
              key={resource.id}
              id="resource-name"
              className={
                direction === 'horizontal'
                  ? 'flex items-center justify-center py-3'
                  : '-rotate-90'
              }
            >
              <span>{resource.name}</span>
              <span>ID: {resource.id}</span>
            </div>
          ))}
        </div>
      </velcure.div>
    );
  }
);
