import { IconButton } from '#/components/button/src';
import { SearchIcon, XMarkIcon } from '#/components/icons/src';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { Input, InputProps } from './input';
import { InputRightElement } from './input-element';
import { InputGroup } from './input-group';

export interface SearchInputProps extends InputProps {
  /**
   * The delay in milliseconds before the onChange event is fired.
   * @default 300
   */
  delay?: number;
}

function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout;

  return function (...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  } as T;
}

/**
 * A search input component with debounced onChange handler.
 *
 * @param {object} props - The component props
 * @param {function} props.onChange - The change handler
 * @param {number} props.delay - The debounce delay in ms
 * @param {string} props.value - The input value
 *
 * @returns {ReactComponent} The search input component
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (props, ref) => {
    const { onChange, value, defaultValue, delay = 300, ...restProps } = props;

    const [searchValue, setSearchValue] = useState<
      HTMLInputElement['value'] | undefined
    >(defaultValue ?? value ?? '');

    const debouncedOnChange = useCallback(
      debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event);
      }, delay),
      [delay, onChange]
    );

    const setValue = (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;
      setSearchValue(nextValue);

      if (value !== nextValue) {
        debouncedOnChange(event);
      }
    };

    const clearValue = () => {
      setSearchValue('');

      const event = new Event('change', { bubbles: true });

      Object.defineProperty(event, 'target', {
        value: {
          value: '',
        },
      });

      onChange?.(event as any);
    };

    useEffect(() => {
      if (searchValue !== value) {
        const currentSearchValue = searchValue || '';
        const nextValue = value || '';

        if (
          currentSearchValue.length > nextValue.length ||
          currentSearchValue.startsWith(nextValue)
        ) {
          return;
        }

        setSearchValue(value);
      }
    }, [value]);

    return (
      <InputGroup>
        <Input
          {...restProps}
          ref={ref}
          value={searchValue}
          onChange={setValue}
        />
        <InputRightElement>
          {searchValue && searchValue.length > 0 ? (
            <IconButton
              aria-label="clear search"
              variant="ghost"
              size="sm"
              icon={<XMarkIcon />}
              onClick={clearValue}
            />
          ) : (
            <SearchIcon />
          )}
        </InputRightElement>
      </InputGroup>
    );
  }
);
