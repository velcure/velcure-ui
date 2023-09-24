import type { Config } from 'tailwindcss';
import { colors } from './colors';

export const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      aria: {
        invalid: 'invalid="true"',
      },
      data: {
        checked: 'checked',
        disabled: 'disabled',
        readonly: 'readonly',
        focus: 'focus',
        'focus-visible': 'focus-visible',
      },
      colors,
      animation: {
        ripple: 'ripple 600ms linear',
      },
      keyframes: {
        ripple: {
          '0%': {
            transform: 'scale(0)',
            opacity: '.25',
          },
          '100%': {
            transform: 'scale(4)',
            opacity: '0',
          },
        },
      },
      minWidth: {
        2: '0.5rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        '3xs': '14rem',
        '2xs': '16rem',
        xs: '20rem',
      },
      minHeight: {
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
      },
      zIndex: {
        inherit: 'inherit',
        hide: '-1',
        auto: 'auto',
        base: '0',
        docked: '10',
        dropdown: '100',
        sticky: '110',
        banner: '120',
        overlay: '130',
        modal: '140',
        popover: '150',
        skipLink: '160',
        toast: '170',
        tooltip: '180',
      },
    },
  },
  plugins: [],
};
