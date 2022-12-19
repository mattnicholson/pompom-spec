import Alpine from "alpinejs";
import onAnimationFrame from "/src/js/dom/onAnimationFrame.js";
import { init } from "/src/js/utils/alpine";
import gsap from "gsap";

/*

Description:
--------------
Parallax transformer

Example Usage:
---------------
<div x-data="parallax" :data-progress="{number between 0 and 1}"></div>

Example where speed is reversed, amount of distance is equal to object height and no offset is added
-----------------
<div x-data="parallax" data-amount="1" data-speed="-1" data-offset="0" :data-progress="{number between 0 and 1}"></div>

*/

init(() => {
	Alpine.data("parallax", () => ({
		offset: 0.5, // Offset start distance by percentage of the amount
		amount: 0.3, // Percent of height
		speed: 1, // Direction of parallax relative to normal scroll
		progress: 0,
		doParallax() {
			let dist = this.$el.offsetHeight * this.amount;
			let start = -dist * (this.offset * this.speed);

			let pos = start + dist * this.speed * this.progress;

			gsap.set(this.$el, { y: `${pos}px` });
		},
		init(args) {
			onAnimationFrame(() => {
				let p = this.$el.dataset.progress;

				if (this.$el.dataset.hasOwnProperty("offset"))
					this.offset = parseFloat(this.$el.dataset.offset);
				if (this.$el.dataset.hasOwnProperty("amount"))
					this.amount = parseFloat(this.$el.dataset.amount);
				if (this.$el.dataset.hasOwnProperty("speed"))
					this.speed = parseFloat(this.$el.dataset.speed);

				if (p === null) return;
				p = parseFloat(p);
				if (p != this.progress) {
					this.progress = p;

					this.doParallax();
				}
			});
		},
	}));
});
