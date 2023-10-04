import { velcure } from '#/components/factory';
import { forwardRef } from 'react';

interface DayResourcesProps {
  resources?: Array<{
    id: string;
    name: string;
  }>;
}

export const DayResources = forwardRef<HTMLDivElement, DayResourcesProps>(
  (props, ref) => {
    const { resources = [] } = props;
    const total = resources.length;

    return (
      <velcure.div
        ref={ref}
        className="sticky top-0 z-30 flex-none bg-background shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
      >
        {/** create a separate mobile topbar here */}
        <div
          className="-mr-px hidden divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid"
          style={{
            gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))`,
          }}
        >
          <div className="col-end-1 w-14" />
          {resources.map((resource) => (
            <div
              key={resource.id}
              id="resource-name"
              className="flex items-center justify-center py-3"
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
