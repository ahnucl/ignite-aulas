import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

/** SWC entende decorators, o ESBUILD, não */

export default defineConfig({
  test: {
    globals: true,
    root: './',
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
