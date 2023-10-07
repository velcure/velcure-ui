import { Circle, HTMLVelcureProps, velcure } from '#/components/factory';
import { cn } from '#/utilities';
import { forwardRef } from 'react';

export interface AbsenceAgendaProps extends HTMLVelcureProps<'div'> {
  labels?: {
    new: string;
    approved: string;
    declined: string;
  };
}

const defaultLabels = {
  new: 'New',
  approved: 'Approved',
  declined: 'Declined',
};

export const AbsenceAgenda = forwardRef<HTMLDivElement, AbsenceAgendaProps>(
  (props, ref) => {
    const { className, labels = defaultLabels, ...restProps } = props;
    return (
      <velcure.div
        className={cn(
          'p-3 justify-end flex divide-x divide-muted w-full',
          className
        )}
        {...restProps}
        ref={ref}
      >
        <div className="inline-flex flex-row gap-2 items-center px-2">
          <Circle className="bg-yellow-100 h-5 w-5" />
          <span className="ml-2">{labels.new}</span>
        </div>
        <div className="inline-flex flex-row gap-2 items-center px-2">
          <Circle className="bg-red-100 h-5 w-5" />
          <span className="ml-2">{labels.declined}</span>
        </div>
        <div className="inline-flex flex-row gap-2 items-center px-2">
          <Circle className="bg-green-100 h-5 w-5" />
          <span className="ml-2">{labels.approved}</span>
        </div>
      </velcure.div>
    );
  }
);

AbsenceAgenda.displayName = 'AbsenceAgenda';
