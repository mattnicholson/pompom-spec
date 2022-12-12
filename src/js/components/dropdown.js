import Alpine from "alpinejs";
import { init } from "/src/js/utils/alpine";

/*

Description:
--------------
Simple visibility toggler

Example Usage:
---------------
<div x-data="dropdown">
	<button @click="toggle">Toggle Content</button>

	<div x-show="open">Content...</div>
</div>

*/

init(() => {
	Alpine.data("dropdown", () => ({
		open: false,

		toggle() {
			this.open = !this.open;
		},
	}));
});
