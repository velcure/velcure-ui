import { defineConfig, Options } from 'tsup';

const env = process.env.NODE_ENV;

const commonConfig: Options = {
  splitting: true,
  clean: true, // clean up "dist" folder before building
  dts: true, // build .d.ts files for each entry point
  format: ['esm', 'cjs'],
  minify: env === 'production',
  bundle: true,
  skipNodeModulesBundle: true,
  entryPoints: ['src/index.ts', 'src/theme/index.ts'],
  watch: env === 'development',
  target: 'es2020',
  outDir: 'dist',
  //treeshake: true,
  sourcemap: 'inline',

  external: ['react', 'react-dom'],
  injectStyle: false,
};

export default defineConfig([
  {
    ...commonConfig,
    esbuildOptions: (options) => {},
  },
]);
