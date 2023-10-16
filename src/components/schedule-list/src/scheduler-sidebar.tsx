import { HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import React from 'react';
import { useSchedulerContext } from './use-scheduler';

export interface SchedulerSidebarProps extends HTMLVelcureProps<'div'> {}

export const SchedulerSidebar = React.forwardRef<
  HTMLDivElement,
  SchedulerSidebarProps
>((props, ref) => {
  const { className, children, ...restProps } = props;

  const { setSidebarMounted } = useSchedulerContext();
  /**
   * Notify us if this component was rendered or used,
   * so we can control the grid template columns of the scheduler content.
   */
  React.useEffect(() => {
    setSidebarMounted(true);
    return () => setSidebarMounted(false);
  }, [setSidebarMounted]);

  return (
    <velcure.aside
      ref={ref}
      className={cn('col-span-2 grow w-full flex flex-col min-h-0', className)}
      {...restProps}
    >
      <div className="grow min-h-0 overflow-y-auto text-sm ps-2">
        {children}
      </div>
    </velcure.aside>
  );
});

SchedulerSidebar.displayName = 'SchedulerSidebar';
