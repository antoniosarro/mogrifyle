import type { Config } from 'tailwindcss';

export default {
	darkMode: ['selector', '[data-theme="dark"]'],
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				manrope: ['Manrope', 'sans-serif']
			},
			colors: {
				black: {
					50: '#e7e7e7',
					100: '#cecece',
					200: '#9d9d9d',
					300: '#6d6d6d',
					400: '#3c3c3c',
					500: '#0b0b0b',
					600: '#090909',
					700: '#070707',
					800: '#040404',
					900: '#020202'
				},
				white: {
					50: '#fdfdfb',
					100: '#fbfbf8',
					200: '#f7f8f0',
					300: '#f3f4e9',
					400: '#eff1e1',
					500: '#ebedda',
					600: '#bcbeae',
					700: '#8d8e83',
					800: '#5e5f57',
					900: '#2f2f2c'
				},
				accent: {
					50: '#fceeed',
					100: '#f9deda',
					200: '#f3bcb5',
					300: '#ed9b90',
					400: '#e7796b',
					500: '#e15846',
					600: '#b44638',
					700: '#87352a',
					800: '#5a231c',
					900: '#2d120e'
				}
			},
			keyframes: {
				slideIn: {
					'0%': { opacity: '0', transform: 'translate3d(0, -30%, 0)' },
					'100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' }
				}
			},
			animation: {
				slideIn: 'slideIn 0.4s ease-in-out'
			}
		}
	},

	plugins: []
} satisfies Config;
