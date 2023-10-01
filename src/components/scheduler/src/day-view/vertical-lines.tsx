import { HTMLVelcureProps } from '#/components/factory';
import { cn } from '#/utilities';
import { forwardRef } from 'react';

export interface VerticalLinesProps
  extends Omit<HTMLVelcureProps<'div'>, 'children'> {
  count: number;
}

export const VerticalLines = forwardRef<HTMLDivElement, VerticalLinesProps>(
  (props, ref) => {
    const { count, className, ...restProps } = props;

    const isRTL = () => {
      const userLocale = navigator.language;
      const userLanguage = new Intl.Locale(userLocale).language;
      return ['ar', 'he', 'fa', 'ur'].includes(userLanguage);
    };

    const direction = isRTL() ? 'rtl' : 'ltr';

    return (
      <div
        ref={ref}
        {...restProps}
        className={cn(
          'col-start-1 col-end-2 row-start-1 grid',
          'auto-cols-auto grid-rows-1',
          'divide-x divide-muted',
          'sm:pr-8',
          className
        )}
        dir={direction}
        style={{
          direction: direction,
        }}
      >
        {[...Array(count)].map((_, id) => (
          <div
            key={`Key_vertical_${id}`}
            className="row-span-full"
            style={{
              gridColumnStart: id + 1,
            }}
          />
        ))}
      </div>
    );
  }
);

VerticalLines.displayName = 'VerticalLines';
