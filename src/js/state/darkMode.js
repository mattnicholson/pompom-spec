import Alpine from "alpinejs";
import { init } from "/src/js/utils/alpine";

/*

Description:
--------------
Toggle global darkMode value

Example Usage:
---------------

<button
	x-data
	@click="$store.darkMode.toggle()"
	x-text="$store.darkMode.on ? 'Switch to Light mode' : 'Switch to Dark mode'"
>
	Toggle Dark Mode
</button>

React to the state:
----------------

<div x-data :class="$store.darkMode.on && 'bg-black'"></div>

*/

init(() => {
	Alpine.store("darkMode", {
		on: false,
		label() {
			return this.on ? "Dark Mode" : "Light Mode";
		},
		toggle() {
			this.on = !this.on;
		},
	});
});
