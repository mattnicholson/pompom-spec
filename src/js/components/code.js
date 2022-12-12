import Alpine from "alpinejs";
import intersect from "@alpinejs/intersect";
import morph from "@alpinejs/morph";

import { init } from "/src/js/utils/alpine";

Alpine.plugin(morph);

/*

Description:
--------------
Toggle a view between different breakpoint sizes

Example Usage:
---------------
<div x-data="code">
	<h1>This html will be rendered</h1>
	<p>As a pre-formatted code block</p>
	<div x-text="It parses Alpine before it generates the HTML, so this will show as the browser renders it!"></div>
</div>

<pre><code x-data x-init="() => $nextTick(()=>$el.innerHTML = $refs.styles.innerHTML.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
   return '&#'+i.charCodeAt(0)+';';
}).replace(/\n/gi,'NEWLINE').replace(/\s+/gi,' ').replace(/NEWLINE/gi,'\n')).replace(/^\n/,'')"></code></pre>

*/

const sizes = {
	sm: { width: 375, height: 680 },
	md: { width: 1024, height: 600 },
	lg: { width: 1920, height: 1080 },
};
const template = `
<div @click.outside="open = false" class="pb-8 relative" :class="!open ? 'closed inline-block' : 'open block' ">
<div class="flex">
	<div class="icon" data-icon="code" @click="open = !open"></div>	
	<div class="icon" data-icon="copy" @click="copy()">
	<div class="absolute top-full right-1/2 translate-x-1/2 translate-y-2">
		<div x-transition x-show="copied">
			<div class="font-mono drop-shadow-xl z-10 text-[10px] bg-white/90 p-[4px] rounded">Copied!</div>
		</div>
	</div>
	</div>
</div>

<template x-if="open">
	<div class="absolute top-2 right-2">
		<div class="icon" data-icon="cross" @click="open = false"></div>
	</div>
</template>


<template x-if="open">
<div class="border-t p-4 mt-2 border-current">
<template x-if="cleanHTML"><pre><code x-text="encode()"></code></pre></template>
</div>
</template>

</div>`;

init(() => {
	// Lazy include code beautify script
	var script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.setAttribute(
		"src",
		"https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.7/beautify-html.min.js"
	);

	document.getElementsByTagName("head")[0].appendChild(script);

	Alpine.data("code", () => ({
		copied: false,
		open: false,
		origHTML: "",
		cleanHTML: "",
		copy() {
			this.copied = true;
			setTimeout(() => (this.copied = false), 1000);
			navigator.clipboard.writeText(this.cleanHTML);
		},
		clean(html) {
			let toClean = html.replace(/\s+/, " ");
			return window.html_beautify(html);
		},
		encode() {
			return this.cleanHTML;
			return this.cleanHTML.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
				return "&#" + i.charCodeAt(0) + ";";
			});
		},
		storeHTML(callback) {
			// Make sure we have loaded the beautifier
			if (window.html_beautify) {
				this.cleanHTML = this.clean(this.origHTML);
				callback();
			} else {
				script.addEventListener("load", () => {
					this.cleanHTML = this.clean(this.origHTML);
					callback();
				});
			}
		},
		cleanAlpine(html) {
			// This function removes all Alpine code from the markup,
			// leaving the clean rendered output

			let orig = html;
			let out = html;

			// Remove alpine attributes
			out = out.replace(/\sx\-[^"]+"[^"]*"/gi, "");
			out = out.replace(/\s:[^"]+"[^"]+"/gi, "");
			out = out.replace(/\s@[^"]+"[^"]+"/gi, "");

			// Create a false div
			var div = document.createElement("div");
			div.innerHTML = out;

			// Remove the <template> tags
			let elements = div.getElementsByTagName("template");
			while (elements[0]) elements[0].parentNode.removeChild(elements[0]);

			// Return the cleaned html
			let repl = div.innerHTML;

			return repl;
		},
		init(args) {
			// Process on next tick so any nested alpine can be parsed first
			this.$nextTick(() => {
				let $ref = this.$el.dataset.hasOwnProperty("from")
					? document.querySelector(this.$el.dataset.from)
					: this.$el;

				this.origHTML = this.cleanAlpine($ref.innerHTML);
				this.$el.innerHTML = template;
				this.storeHTML(() => {});
			});
		},
		listener: {
			["x-effect"]() {
				this.setScale();
			},
		},
	}));
});
