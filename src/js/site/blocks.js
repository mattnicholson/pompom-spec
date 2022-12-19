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
				<div x-data="block" x-bind="watch" :data-align="block.align" :data-style="block.style" :data-type="block.type" :data-index="index" :data-content="JSON.stringify(block)">
					
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
			this.codeview = this.$el.dataset.codeview === "true" ? true : false;

			this.$nextTick(() => {
				this.$el.innerHTML = template;
			});
		},
	}));

	Alpine.data("block", () => ({
		viewportProgress: 0,
		half: false,
		visible: false,
		seen: false,
		full: false,
		visibleModifier() {
			return this.visible ? "visible" : "not-visible";
		},
		seenModifier() {
			return this.seen ? "seen" : "not-seen";
		},
		halfModifier() {
			return this.half ? "halfway" : "not-halfway";
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
