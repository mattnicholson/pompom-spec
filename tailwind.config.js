const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
	safelist: [
		{
			pattern: /font-+/,
		},
	],
	theme: {
		extend: {
			spacing: {
				/* 18 columns */
				singlecol: "5.56vw",
				doublecol: "11vw",
				halfcol: "2.78vw",
			},

			colors: {
				page: "#F8EAE2",
				pink: "#FDD5D5",
				"off-black": "#252525",
				text: "#252525",
			},
			fontFamily: {
				icon: ["linearicons"],
				primary: ["Volte Semibold", ...fontFamily.sans],
				light: ["Volte", ...fontFamily.sans],
				serif: ["Minion Pro", ...fontFamily.serif],
				mono: ["ui-monospace", ...fontFamily.mono],
			},
			fontSize: {
				xs: `${12 / 16}rem`,
				sm: `${14 / 16}rem`,
				body: `${18 / 16}rem`,
				lg: `${20 / 16}rem`,
				xl: `${25 / 16}rem`,
				"2xl": `${35 / 16}rem`,
				vw: `${(65 / 1280) * 100}vw`,
				max: `${65 / 16}rem`,
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
