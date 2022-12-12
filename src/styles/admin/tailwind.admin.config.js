const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				sm: { max: "1023px" },
			},
			fontFamily: {
				icon: ["linearicons"],
				primary: [...fontFamily.sans],
				serif: [...fontFamily.serif],
				mono: ["ui-monospace", ...fontFamily.mono],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
