import { HTMLVelcureProps, velcure } from '#/components/factory';
import { useInterval, useMergeRefs } from '#/hooks';
import { cn } from '#/utilities';
import dayjs from 'dayjs';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useSchedulerContext } from '../use-scheduler';

export interface CurrentTimeProps extends HTMLVelcureProps<'div'> {}

function calculateMinutesFromStart(
  startHour: number,
  currentHour: number,
  currentMinute: number
) {
  const startMinute = startHour * 60;
  const currentMinuteOfDay = currentHour * 60 + currentMinute;
  return currentMinuteOfDay - startMinute;
}

export const CurrentTime = forwardRef<HTMLDivElement, CurrentTimeProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    const currentTimeRef = useRef<HTMLDivElement>(null);
    const { startHour, endHour } = useSchedulerContext();
    const [scrolledIntoView, setScrolledIntoView] = useState(false);
    const [currentTimePos, setCurrentTimePos] = useState<number | null>(null);

    const calculateTimePos = useCallback(
      (time: dayjs.Dayjs) => {
        const currentHour = time.hour();
        const currentMinute = time.minute();

        if (currentHour > endHour || currentHour < startHour) {
          setCurrentTimePos(null);
          return;
        }

        const minutesFromStart = calculateMinutesFromStart(
          startHour,
          currentHour,
          currentMinute
        );
        setCurrentTimePos(minutesFromStart);

        if (!currentTimeRef.current || scrolledIntoView) return;
        // Within a small timeout so element has time to render.
        setTimeout(() => {
          currentTimeRef?.current?.scrollIntoView({ block: 'center' });
          setScrolledIntoView(true);
        }, 100);
      },
      [
        startHour,
        endHour,
        scrolledIntoView,
        currentTimeRef.current,
        setCurrentTimePos,
      ]
    );

    useInterval(() => {
      calculateTimePos(dayjs());
    }, 1000 * 60);

    useEffect(() => {
      calculateTimePos(dayjs());
    }, []);

    return (
      <velcure.div
        ref={useMergeRefs(currentTimeRef, ref)}
        {...restProps}
        className={cn(
          'absolute top-0 z-40 flex h-px items-center justify-center text-xs w-full',
          className
        )}
        aria-hidden={true}
        style={{
          ...restProps.style,
          top: `calc(${currentTimePos}*var(--one-minute-height) + var(--calendar-offset-top))`,
          zIndex: 70,
        }}
      >
        <div className="w-14 pr-2 text-right">{dayjs().format('HH:mm')}</div>
        <div className="bg-red-400 h-3 w-px" />
        <div className="bg-red-400 h-px w-full" />
      </velcure.div>
    );
  }
);

CurrentTime.displayName = 'CurrentTime';
