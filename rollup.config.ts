import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import svelte_draft from 'rollup-plugin-svelte-draft';
import globals from 'rollup-plugin-node-globals';
import { string } from "rollup-plugin-string";
import { mdsvex } from "mdsvex";
import draftConfig from "./svelte-draft.config";

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js',
		globals: {
			"svelte-draft": 'SvelteDraft'
		}
	},
	external: ['svelte-draft'],
	plugins: [
		string({
			// Required to be specified
			include: "**/*.snippet"
		}),
		svelte_draft({
			include: ["./src/**/*.tsx", "./src/**/*.ts"], config: draftConfig
		}),
		svelte({
			extensions: [".tsx", ".svelte", ".svx"],
			preprocess: mdsvex({
				layout: {
					docs: "./src/site/docs/layout/docs.svelte"
				}
			}),
			exclude: "./src/**/*.js.tsx",
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write('public/build/bundle.css');
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		globals(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}