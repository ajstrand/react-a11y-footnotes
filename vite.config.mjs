import { defineConfig } from 'vite'
import path from 'path'
import preact from '@preact/preset-vite'

const build = {
  lib: {
    entry: path.resolve(__dirname, 'src/index.jsx'),
    name: 'react-footnotes-a11y',
    fileName: format => `react-footnotes-a11y.${format}.js`,
  },
  rollupOptions: {
    // make sure to externalize deps that shouldn't be bundled
    // into your library
    external: ['preact', 'preact/jsx-runtime', 'preact/hooks', 'prop-types'],
    output: {
      // Provide global variables to use in the UMD build
      // for externalized deps
      globals: {
        preact: 'preact',
        'preact/jsx-runtime': 'preact/jsx-runtime',
        'preact/hooks': 'preact/hooks',
        'prop-types':'prop-types'
      },
    },
  },
}

export default defineConfig({
  plugins: [preact()],
  build: {
    ...build,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setupTests.js',
  },
})
