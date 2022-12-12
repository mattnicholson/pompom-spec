import Alpine from "alpinejs";
import intersect from "@alpinejs/intersect";
import morph from "@alpinejs/morph";

import { init } from "/src/js/utils/alpine";
import { calcFitBox } from "/src/js/utils/layout";

Alpine.plugin(intersect);
Alpine.plugin(morph);

/*

Description:
--------------
Toggle a view between different breakpoint sizes

Example Usage:
---------------
<div x-data="breakpointSwitcher" data-src="/path/to/source.html"></div>

*/

const sizes = {
	sm: { width: 375, height: 680 },
	md: { width: 1024, height: 600 },
	lg: { width: 1920, height: 1080 },
};
const template = `
<div x-bind="listener" class="pb-8">
<div class="flex justify-center">
	<ul class="toggler">
		<li :class="(cur == 'sm') && 'active'" @click="cur = 'sm'"><span class="icon" data-icon="smartphone"></span></li>
		<li :class="(cur == 'md') && 'active'" @click="cur = 'md'"><span class="icon" data-icon="laptop"></span></li>
		<li :class="(cur == 'lg') && 'active'" @click="cur = 'lg'"><span class="icon" data-icon="desktop"></span></li>
		<li><span class="icon" data-icon="launch" @click='window.open($root.dataset.src)'></span></li>
	</ul>
</div>
<div x-ref="sizer" class="h-[70vh] relative">
<iframe
	class="origin-center block top-1/2 left-1/2"
	:class="fullscreen ? 'fixed' : 'absolute'"
	:width="getWidth()"
	:height="getHeight()"
	x-ref="iframe"
	:src="$root.dataset.src"
></iframe>
<div @click="fullscreen = !fullscreen" class="cursor-pointer bottom-8 right-8 sm:right-4" :class="fullscreen ? 'fixed sm:bottom-24' : 'absolute'"><span class="icon" :data-icon="fullscreen ? 'zoom-out' : 'zoom-in'"></span></div>
</div>
</div>`;

init(() => {
	Alpine.data("breakpointSwitcher", () => ({
		fullscreen: false,
		src: "",
		cur: "md",

		getWidth() {
			return sizes[this.cur].width;
		},
		getHeight() {
			return sizes[this.cur].height;
		},
		setScale() {
			// Remove current scale to capture natural size
			this.$refs.iframe.style.transform = "";

			// Get the size of the sizer (base on slightly smaller for some whitesapce)
			let w = this.$refs.sizer.offsetWidth * 0.95;
			let h = this.$refs.sizer.offsetHeight * 0.95;

			// Always make 'md' size seem slightly smaller than lg
			if (this.cur === "md") {
				w = this.$refs.sizer.offsetWidth * 0.9;
				h = this.$refs.sizer.offsetHeight * 0.9;
			}

			if (this.fullscreen) {
				w = window.innerWidth - 40;
				h = window.innerHeight - 40;
			}

			let parent = {
				width: w,
				height: h,
			};
			let child = sizes[this.cur];

			let fitBox = calcFitBox({ parent, child, mode: "contain" });
			let scale = fitBox.scale;

			this.$refs.iframe.style.transform = `translate(-50%,-50%) scale(${fitBox.scale})`;
		},
		init(args) {
			// data-src
			this.src = this.$el.dataset.src;
			this.$watch("cur", () => {
				this.setScale();
			});
			this.$nextTick(() => {
				this.$el.innerHTML = template;

				window.addEventListener("resize", () => {
					this.setScale();
				});
			});
		},
		listener: {
			["x-effect"]() {
				this.setScale();
			},
		},
	}));
});
