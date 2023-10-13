import { useControllableState } from '#/hooks';
import { PropGetter } from '#/utilities';
import dayjs from 'dayjs';
import { useCombobox } from 'downshift';
import React, { useCallback } from 'react';
import { formatNumber } from './utils';

export interface TimeInputOptions {
  value?: Date | string;
  onValueChange?: (value: Date) => void;
  /**
   * The minimum time that can be selected.
   * @example: '09:00'
   * @default: '00:00'
   */
  minTime?: string;
  /**
   * The maximum time that can be selected.
   * @example: '17:00'
   * @default: '23:59'
   */
  maxTime?: string;
  /**
   * The step interval between hours.
   * @example: 2
   * @default: 1
   */
  incrementHours?: number;
  /**
   * The step interval between minutes.
   * @example: 15
   * @default: 15
   */
  incrementMinutes?: number;
  /**
   * Whether to show AM/PM options.
   * @default: false
   */
  amPm?: boolean;
}

// Type for time values
type Value = {
  label: string; // Text label
  value: string; // Timestring, e.g. 13:30
  hour: number;
  minute: number;
};

export const useTimeInput = (options: TimeInputOptions = {}) => {
  const {
    minTime = '00:00',
    maxTime = '23:59',
    incrementHours = 1,
    incrementMinutes = 15,
    amPm,
    value: valueProp,
    onValueChange,
  } = options;

  const times = React.useMemo(() => {
    const minParts = minTime.split(':');
    const minHours = parseInt(minParts[0], 10);
    const minMinutes = parseInt(minParts[1], 10);

    const maxParts = maxTime.split(':');
    const maxHours = parseInt(maxParts[0], 10);
    const maxMinutes = parseInt(maxParts[1], 10);

    const validTimes: Value[] = [];

    for (let hour = minHours; hour <= maxHours; hour += incrementHours) {
      for (let minute = 0; minute < 60; minute += incrementMinutes) {
        if (hour < minHours || (hour === minHours && minute < minMinutes)) {
          continue; // too small, skip
        }

        if (hour > maxHours || (hour === maxHours && minute > maxMinutes)) {
          break; // too large, stop
        }

        validTimes.push({
          label: `${formatNumber(hour, true, amPm)}:${formatNumber(
            minute,
            true,
            amPm
          )}`,
          value: `${hour}:${minute}`,
          hour: hour,
          minute: minute,
        });
      }
    }

    return validTimes;
  }, [minTime, maxTime, amPm]);

  const [inputValue, setInputValue] = React.useState<string>('');

  const filteredTimes: Value[] = React.useMemo(() => {
    if (!inputValue) return times;

    return times.filter((time) => {
      return time.label.toLowerCase().includes(inputValue.toLowerCase());
    });
  }, [times, inputValue]);

  const getValue = useCallback(
    (input?: string | Date) => {
      if (!input) return undefined;

      const date = dayjs(input);

      // Round minutes to the nearest multiple of incrementMinutes
      // For example, round to nearest 15 minutes if increment is 15
      const roundedMinutes =
        Math.round(date.minute() / incrementMinutes) * incrementMinutes;

      return date
        .set('minute', roundedMinutes) // Set the rounded minutes
        .toDate(); // Convert back to JavaScript Date object
    },
    [incrementMinutes]
  );

  const [value, setValue] = useControllableState({
    value: getValue(valueProp),
    defaultValue: getValue(new Date()),
    onChange: onValueChange,
  });

  const updateSelectedDate = (selectedItem: Value | null | undefined) => {
    if (!selectedItem) return;

    const date = dayjs()
      .set('hour', selectedItem.hour)
      .set('minute', selectedItem.minute)
      .toDate();

    setValue(date);
  };

  const getDefaultSelectedItem = useCallback(() => {
    let nearestItem = null;
    let nearestDistance = Infinity;

    for (const time of filteredTimes) {
      // calculate distance between selected time and current time
      const hourDiff = Math.abs(time.hour - dayjs(value).hour());
      const minDiff = Math.abs(time.minute - dayjs(value).minute());

      // total distance
      const distance = hourDiff + minDiff;

      if (distance < nearestDistance) {
        nearestItem = time;
        nearestDistance = distance;
      }
    }

    return nearestItem;
  }, [filteredTimes, value]);

  const {
    isOpen,
    selectedItem,
    highlightedIndex,
    getInputProps: getDownshiftInputProps,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  } = useCombobox({
    defaultInputValue: dayjs(value).format('HH:mm'),
    defaultSelectedItem: getDefaultSelectedItem(),
    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue || '');
    },
    items: filteredTimes,
    itemToString: (item) => (item ? item.label : ''),
    onSelectedItemChange: ({ selectedItem }) => {
      updateSelectedDate(selectedItem);
    },
  });

  const getInputProps: PropGetter = React.useCallback(
    (props = {}, ref) => {
      return getDownshiftInputProps({
        ...props,
        ref,
      });
    },
    [getDownshiftInputProps]
  );

  return {
    times: filteredTimes,
    isOpen,
    selectedItem,
    highlightedIndex,
    getInputProps,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  };
};
