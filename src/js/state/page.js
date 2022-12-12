import Alpine from "alpinejs";
import { init } from "/src/js/utils/alpine";

/*

Description:
--------------
Set the title of the store page.title

Example Usage:
---------------
<div x-data x-effect="$store.page.set('Home')"></div>

*/
init(() => {
	Alpine.store("page", {
		title: "",

		set(title) {
			this.title = title;
		},
	});
});
