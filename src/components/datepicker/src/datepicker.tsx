import { IconButton } from '#/components/button/src';
import { FormControlOptions } from '#/components/form-control/src';
import { Input, InputGroup, InputRightElement } from '#/components/input/src';
import {
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '#/components/popover/src';
import { Portal } from '#/components/portal/src';
import { useControllableState, useDisclosure } from '#/hooks';
import { forwardRef, useState } from 'react';
import { Calendar, CalendarOptions } from './calendar';
import { CalendarIcon } from './calendar-icon';
import {
  formatInitialInputValue,
  isDateInRange,
  parseInputValue,
} from './utils';

type Omitted = 'onClick' | 'value' | 'activeStartDate';

export type DatepickerOptions = {
  /**
   * The default format to use when parsing/formatting date strings in the input
   * @see https://day.js.org/docs/en/parse/string-format
   * @default DD.MM.YYYY
   */
  format?: string;
  formatDate?: (date: Date) => string;
  placeholder?: string;
  defaultValue?: Date;
  value?: Date;
  onChange?: (date?: Date) => void;
};

export interface DatepickerProps
  extends Omit<CalendarOptions, Omitted>,
    DatepickerOptions,
    FormControlOptions {}

export const Datepicker = forwardRef<HTMLInputElement, DatepickerProps>(
  (props, ref) => {
    const {
      title,
      maxValue,
      minValue,
      defaultView,
      weekStart,
      locale = 'de',
      // input props
      isRequired,
      isDisabled,
      isInvalid,
      isReadOnly,
      // datepicker props
      formatDate,
      placeholder = 'DD.MM.YYYY',
      defaultValue,
      value: valueProp,
      onChange,
      format = 'DD.MM.YYYY',
    } = props;

    const calendarProps = {
      title,
      maxValue,
      minValue,
      defaultView,
      weekStart,
      locale,
    };

    const [value, setValue] = useControllableState<Date | undefined>({
      defaultValue,
      value: valueProp,
      onChange,
    });

    const [inputValue, setInputValue] = useState<string>(
      formatInitialInputValue({
        value,
        locale,
        formatDate,
      })
    );

    const { isOpen, onClose, onOpen } = useDisclosure();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInputValue(val);

      const currentDate = parseInputValue({ inputValue: val, locale, format });

      if (currentDate) {
        setValue(currentDate);
      }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'Enter':
        case 'Escape':
          onClose();
          break;
        case 'ArrowUp':
        case 'ArrowDown':
        case ' ':
          onOpen();
          break;
      }
    };

    const onCalendarClick = (date: Date) => {
      if (isReadOnly || isDisabled) return;

      setValue(date);
      setInputValue(
        formatInitialInputValue({
          value: date,
          locale,
          formatDate,
        })
      );
      onClose();
    };

    return (
      <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        <PopoverAnchor>
          <InputGroup>
            <Input
              ref={ref}
              type="text"
              value={inputValue}
              autoComplete="off"
              placeholder={placeholder}
              onChange={handleInputChange}
              onKeyDown={onKeyDown}
              isInvalid={
                isInvalid ||
                (value && !isDateInRange(value, minValue, maxValue))
              }
              isDisabled={isDisabled}
              isReadOnly={isReadOnly}
              isRequired={isRequired}
            />

            <PopoverTrigger>
              <InputRightElement>
                <IconButton
                  size="sm"
                  variant="ghost"
                  aria-label="Show Calendar"
                >
                  <CalendarIcon />
                </IconButton>
              </InputRightElement>
            </PopoverTrigger>
          </InputGroup>
        </PopoverAnchor>
        <Portal>
          <PopoverContent className="w-full">
            <PopoverBody>
              <Calendar
                value={value}
                onClick={onCalendarClick}
                {...calendarProps}
                activeStartDate={value}
              />
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    );
  }
);

Datepicker.displayName = 'Datepicker';
