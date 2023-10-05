import { HTMLVelcureProps, velcure } from '#/components/factory';
import { ariaAttr, callAllHandlers, cn, dataAttr } from '#/utilities';
import { cva } from 'class-variance-authority';
import { forwardRef, useMemo, useState } from 'react';

export interface TrProps extends HTMLVelcureProps<'tr'> {
  /**
   * Applies styling for a selected row
   */
  isSelected?: boolean;
  /**
   * Applies styling for a focused row
   */
  isFocused?: boolean;
  /**
   * Applies styling for a read-only row
   */
  isReadOnly?: boolean;
}

const classes = cva(
  [
    'table-row transition-colors align-top box-border',
    'focus:outline-none',
    // select first cell
    'group',
    'hover:bg-accent',
  ],
  {
    variants: {
      isSelected: {
        true: 'bg-primary/10 hover:bg-primary/20',
        false: '',
      },
      isFocused: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      isSelected: false,
    },
  }
);

export const Tr = forwardRef<HTMLTableRowElement, TrProps>((props, ref) => {
  const {
    className,
    isFocused: focused,
    isReadOnly,
    isSelected,
    ...restProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const computedFocused = useMemo(() => {
    if (typeof focused !== 'undefined') {
      return focused;
    }

    if (isReadOnly) {
      return false;
    }

    return isFocused;
  }, [focused, isFocused, isReadOnly]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>) => {
    // when the user presses ArrowUp or ArrowDown,
    // we want to move focus to the next row that is not read-only (aria-readonly="true")
    // and not disabled (aria-disabled="true")
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();

      let rows = Array.from(
        e.currentTarget.parentElement?.children || []
      ) as HTMLTableRowElement[];

      if (e.key === 'ArrowUp') {
        rows = rows.reverse();
      }

      const currentIndex = rows.indexOf(e.currentTarget);

      const nextRow = rows.find((row, index) => {
        if (index === currentIndex) {
          return false;
        }

        if (index < currentIndex) {
          return false;
        }

        return (
          !row.hasAttribute('aria-readonly') &&
          !row.hasAttribute('aria-disabled')
        );
      });

      // if undefined, we've reached the end of the table
      // depending on our direction, we want to focus the first or last row
      if (!nextRow) {
        rows[0].focus();
        return;
      }

      if (nextRow) {
        nextRow.focus();
      }
    }
  };

  return (
    <velcure.tr
      {...restProps}
      className={cn(
        classes({
          isFocused: computedFocused,
          isSelected,
        }),
        className
      )}
      onFocus={callAllHandlers(restProps.onFocus, () => {
        setIsFocused(true);
      })}
      onBlur={callAllHandlers(restProps.onBlur, () => {
        setIsFocused(false);
      })}
      ref={ref}
      tabIndex={isReadOnly ? undefined : -1}
      data-selected={dataAttr(isSelected)}
      aria-readonly={ariaAttr(isReadOnly)}
      onKeyDown={callAllHandlers(restProps.onKeyDown, onKeyDown)}
    />
  );
});

Tr.displayName = 'Tr';
