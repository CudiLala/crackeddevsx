/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			keyframes: {
				'pass-by': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(calc(100vw + 100%))' }
				},
				pop: {
					'0%': { transform: 'scale(0.8)' }
				}
			},
			animation: {
				'pass-by': 'pass-by 1.5s linear infinite',
				pop: 'pop 100ms linear 1'
			}
		}
	},
	plugins: []
};
