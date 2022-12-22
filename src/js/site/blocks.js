import Alpine from "alpinejs";
import intersect from "@alpinejs/intersect";

import { init } from "/src/js/utils/alpine";
import { data } from "/src/js/state/data/blocks.js";

import onViewportProgress from "/src/js/dom/onViewportProgress.js";

import templates from "/src/js/site/block/";

Alpine.plugin(intersect);

/*

Description:
--------------
Generate an output of blocks based on js data

Example Usage:
---------------
<div x-data="blocks"></div>

With codeview for each block:
----------------
<div x-data="blocks" data-codeview="true"></div>

From custom JSON:
---------------
<div
x-data="blocks"
data-blocks='[{"type":"item","title":"Foo","image":"/path/to/image.jpg"}]'
></div>

*/

const template = `
<div>
	<template x-for="(block, index) in blocks">
		<div>
			<template x-if="codeview">
				<div class="pl-4 md:pl-8">
					<div class="spec-caption">Type: <span x-text="block.type"></span> / Style: <span x-text="block.style"></span></div>
				</div>
			</template>
			<div :id="'block_'+index">
				<div x-data="block" x-bind="watch" :data-align="block.align || 'default'" :data-align-vertical="block.alignVertical || 'default'" :data-align-text="block.alignText || 'default'" :data-style="block.style || 'default'" :data-type="block.type" :data-index="index" :data-content="JSON.stringify(block)">
					
				</div>
			</div>
			<template x-if="codeview">
				<div x-data="blockCode" :data-index="index">
				
				</div>
			</template>
		</div>
	</template>
</div>`;

const codeTemplate = (index) => `
<div class="padded">
	<div class="code" x-data="code" data-from="#block_${index}"></div>
</div>`;

init(() => {
	Alpine.data("blocks", () => ({
		codeview: false,
		blocks: data,
		init() {
			// Allow custom blocks...
			let customBlocks = this.$el.dataset.blocks;
			if (customBlocks) this.blocks = JSON.parse(customBlocks);

			this.codeview = this.$el.dataset.codeview === "true" ? true : false;

			this.$nextTick(() => {
				this.$el.innerHTML = template;
			});
		},
	}));

	Alpine.data("block", () => ({
		hasInit: false,
		viewportProgress: 0,
		visible: false,
		seen: false,
		full: false,
		visibleModifier() {
			return this.visible ? "visible" : "not-visible";
		},
		seenModifier() {
			return this.seen ? "seen" : "not-seen";
		},
		fullModifier() {
			return this.full ? "full" : "not-full";
		},
		content: {},
		init() {
			this.$nextTick(() => {
				let block = JSON.parse(this.$el.dataset.content);
				let template = templates.hasOwnProperty(block.type)
					? templates[block.type].template
					: templates["default"].template;

				this.$el.innerHTML = template;
				this.content = block;

				// If this block has started above the viewport,
				// then make its start position wherever it begins...

				setTimeout(() => {
					var viewportOffset = this.$el.getBoundingClientRect();
					// these are relative to the viewport, i.e. the window
					var top = viewportOffset.top + window.scrollY;

					let progressProps = {
						ref: this.$el,
						distance: window.innerHeight,
					};

					/*if (top < window.innerHeight) {
						progressProps.start = top;
						progressProps.ignoreViewport = true;
						progressProps.distance = window.innerHeight + top;
					}*/

					onViewportProgress(({ progress }) => {
						// Make sure everything has init
						if (!this.hasInit) {
							if (progress < 0.5) {
							} else {
								this.seen = true;
								this.visible = true;
							}
							this.hasInit = true;
						}

						// Enter
						if (progress >= 0.25) {
							if (!this.seen) this.seen = true;
							if (!this.visible) this.visible = true;
						}

						// Leave...
						if (progress <= 0 && this.visible) {
							this.visible = false;
						}
						if (progress >= 1 && this.visible) {
							this.visible = false;
						}

						this.viewportProgress = progress;
					}, progressProps);
				}, 0);
			});
		},
		watch: {
			/*[":data-progress"]() {
				return this.viewportProgress;
			},*/
			[":class"]() {
				return `Block`;
			},
			[":data-visibility"]() {
				if (!this.hasInit) return "not-visible";
				return this.visible ? "visible" : "not-visible";
			},
			[":data-seen"]() {
				if (!this.hasInit) return "not-seen";
				return this.seen ? "seen" : "not-seen";
			},
			/*["x-intersect.once"]() {
				this.seen = true;
			},*/
			/*["x-intersect.half"]() {
				if (!this.hasInit) return;
				this.seen = true;
				this.visible = true;
			},
			["x-intersect.full"]() {
				if (!this.hasInit) return;
				this.full = true;
			},
			["x-intersect:leave"]() {
				this.visible = false;
				this.full = false;
			},*/
		},
	}));

	Alpine.data("blockCode", () => ({
		init() {
			this.$nextTick(() => {
				let index = this.$el.dataset.index;
				this.$el.innerHTML = codeTemplate(index);
			});
		},
	}));
});
