import Alpine from "alpinejs";
import intersect from "@alpinejs/intersect";

import { init } from "/src/js/utils/alpine";

Alpine.plugin(intersect);

/*

Description:
--------------
Lazy iframe loader

Example Usage:
---------------
<div x-data="iframe" x-bind="lazy" data-src="/path/to/source.html"></div>

*/

init(() => {
	Alpine.data("iframe", () => ({
		init(args) {
			// Load immediately if not lazy
			if (!this.$el.getAttribute("x-bind")) this.load();
		},
		load() {
			this.$el.setAttribute("src", this.$el.getAttribute("data-src"));
		},
		lazy: {
			["x-intersect.once"]() {
				this.load();
			},
		},
	}));
});
