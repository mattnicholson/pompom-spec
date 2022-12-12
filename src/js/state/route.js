import Alpine from "alpinejs";
import { init } from "/src/js/utils/alpine";

/*

Description:
--------------
Set a global route variable

Example Usage:
---------------
<div x-data x-effect="$store.route.update(window.location.href)"></div>

*/
init(() => {
	Alpine.store("route", {
		href: "",

		match(rule) {
			return this.href.match(rule);
		},
		is(rule) {
			return this.href === rule;
		},
		willMatch(rule) {
			return this.loadingHref.match(rule);
		},
		willBe(rule) {
			return this.loadingHref === rule;
		},
		update(url) {
			// Convert to path
			let out = url;
			out = out.replace(/^[a-zA-Z]{3,5}\:\/{2}[a-zA-Z0-9_.:-]+\//, "");

			// Add leading slash
			this.href = `/${out}`;
		},
	});
});
