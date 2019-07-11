import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import istanbul from 'rollup-plugin-istanbul'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/main.js',
  output: {
    sourcemap: 'inline',
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js'
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write('public/bundle.css')
      }
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: importee =>
        importee === 'svelte' || importee.startsWith('svelte/')
    }),
    commonjs(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),

    // only instrument source code in development mode
    !production &&
      istanbul({
        // only instrument our files in "src" folder
        // which will instrument ".svelte" and ".js" files
        extensions: ['.js', '.svelte'],
        include: ['src/**/*'],
        sourceMap: true,
        compact: false,
        debug: true
      })
  ],
  watch: {
    clearScreen: false
  }
}
