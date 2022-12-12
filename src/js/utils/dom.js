import { strToArr } from "./string.js";

let isReady = false;

document.addEventListener("DOMContentLoaded", function () {
	isReady = true;
});

// Trigger on dom content loaded
function ready(fn) {
	if (isReady) {
		fn();
	} else {
		document.addEventListener("DOMContentLoaded", fn);
	}
}

// Convert string to spans wrapping each latter
function letterize(str) {
	let arr = strToArr(str);

	return arr.map((i) => `<span>${i}</span>`).join("");
}

export { ready, letterize };
