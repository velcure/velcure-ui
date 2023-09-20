import { callAllHandlers } from '#/utilities';
import { PropGetter } from '#/utilities/react-types';
import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDebounce } from '../useDebounce';

export const useRipple = () => {
  const [ripples, setRipples] = useState<React.CSSProperties[]>([]);

  const getButtonProps: PropGetter = useCallback((props = {}, ref = null) => {
    const { onClick, ...rest } = props;
    return {
      onClick: callAllHandlers(onClick, (e: React.MouseEvent) => {
        const elem = e.currentTarget;
        //calculate the position and dimensions of the ripple.
        //based on click position and button dimensions
        var rect = elem.getBoundingClientRect();
        var left = e.clientX - rect.left;
        var top = e.clientY - rect.top;
        const height = elem.clientHeight;
        const width = elem.clientWidth;
        const diameter = Math.max(width, height);

        setRipples((prev) => [
          ...prev,
          {
            top: top - diameter / 2,
            left: left - diameter / 2,
            height: Math.max(width, height),
            width: Math.max(width, height),
          },
        ]);
      }),
      ref,
      ...rest,
    };
  }, []);

  const rippleSpans = useMemo(() => {
    return ripples?.map((ripple, index) =>
      createElement('span', {
        key: index,
        className: 'absolute bg-white opacity-0 animate-ripple rounded-full',
        style: {
          ...ripple,
        },
      })
    );
  }, [ripples]);

  //add a debounce so that if the user doesn't click after 1s, we remove the ripples
  const _debounced = useDebounce(ripples, 1000);
  useEffect(() => {
    if (_debounced.length) {
      setRipples([]);
    }
  }, [_debounced.length]);

  return {
    ripples: rippleSpans,
    getButtonProps,
  };
};
