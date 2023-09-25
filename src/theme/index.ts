// import { config as tailwindConfig } from './tailwind.config';
// export { tailwindConfig };
// export default tailwindConfig;
//import { default as plugin } from './plugin';
//export { plugin } from './plugin';
import plugin from 'tailwindcss/plugin';
import { config } from './tailwind.config';

export default plugin.withOptions(
  () => {
    return ({ addComponents }) => {
      addComponents({
        '.nav-switcher-clip': {
          clipPath: `path('M0 24C6 24 10 18 10 10C10 5 6 0 0 0H400C400 0 400 5 400 24H0Z')`,
        },
      });
    };
  },
  () => {
    return config;
  }
);
