import { IconButton } from '#/components/button/src';
import { ClockIcon } from '#/components/icons/src';
import {
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '#/components/input/src';
import { usePopper } from '#/components/popper/src';
import { cn, createSplitProps } from '#/utilities';
import { forwardRef } from 'react';
import { TimeInputOptions, useTimeInput } from './use-time-input';

export interface TimeInputProps
  extends Omit<InputProps, keyof TimeInputOptions>,
    TimeInputOptions {}

/**
 * Time input component
 */
export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  (props, ref) => {
    const [options, restProps] = createSplitProps<TimeInputOptions>()(props, [
      'amPm',
      'incrementHours',
      'incrementMinutes',
      'maxTime',
      'minTime',
      'value',
      'onValueChange',
    ]);

    const {
      times,
      isOpen,
      getInputProps,
      getToggleButtonProps,
      getMenuProps,
      getItemProps,
      selectedItem,
      highlightedIndex,
    } = useTimeInput(options);

    const { referenceRef, getPopperProps } = usePopper({
      enabled: isOpen,
      gutter: 2,
    });

    return (
      <div className="relative">
        <InputGroup ref={referenceRef}>
          <Input {...getInputProps(restProps, ref)} />
          <InputRightElement>
            <IconButton
              size="sm"
              icon={
                <ClockIcon
                  className={cn(
                    'origin-center text-sm transition-transform',
                    isOpen && 'rotate-180'
                  )}
                />
              }
              {...getToggleButtonProps({
                variant: 'ghost',
                'aria-label': 'Open time picker',
              })}
            />
          </InputRightElement>
        </InputGroup>
        <div
          className={cn('z-popover w-full', isOpen ? 'visible' : 'invisible')}
          {...getPopperProps()}
        >
          <ul
            className={cn(
              'relative rounded-md bg-popover text-popover-foreground shadow-md',
              'z-inherit outline-none',
              'text-sm text-inherit pt-2 pb-2  max-h-80 overflow-auto'
            )}
            {...getMenuProps()}
          >
            {isOpen &&
              times.map((item, index) => (
                <li
                  className={cn(
                    'cursor-pointer text-popover-foreground text-sm select-none',
                    highlightedIndex === index &&
                      'bg-accent text-accent-foreground',
                    selectedItem === item && 'font-bold',
                    'py-2 px-3 shadow-sm flex flex-col'
                  )}
                  key={index}
                  {...getItemProps({ item, index })}
                >
                  <span>{item.label}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
);

TimeInput.displayName = 'TimeInput';
