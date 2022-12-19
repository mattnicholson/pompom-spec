import Alpine from "alpinejs";

import { init } from "/src/js/utils/alpine";

import Swiper, { Manipulation, Navigation } from "swiper";

/*

Description:
--------------
Swiper js

Example Usage (template tag is loaded with a scoped object called 'slide')
---------------

<div x-data="swiper" data-slides='[{title:'Slide 1'},{title:'Slide 2'}]'>
	<template>
		<div><h1 x-text="slide.title"></div>
	</template>
</div>

JSON encoded:
----------------

<div x-data="swiper" :data-slides='JSON.stringify(slides)'>
	<template>
		<div><h1 x-text="slide.title"></div>
	</template>
</div>

*/

const template = `<div class="swiper">
		
			
		  <!-- Additional required wrapper -->
		  <div class="swiper-wrapper">
		  	
		  </div>
		  <!-- If we need pagination -->
		  <div class="swiper-pagination"></div>

		  <!-- If we need navigation buttons -->
		  <div class="swiper-button-prev"></div>
		  <div class="swiper-button-next"></div>

		  <!-- If we need scrollbar -->
		  <div class="swiper-scrollbar"></div>
		</div>
		
	</div>`;

init(() => {
	Alpine.data("swiper", (slides) => ({
		slideTemplate: "",
		slides: [],
		makeSlides() {
			return this.slides.map((slide, index) => {
				slide.id = index + Date.now();
				return slide;
			});
		},
		init(args) {
			// Stash the <template> tag will render for each slide
			this.slideTemplate = Array.from(this.$el.childNodes).find(
				(child) => {
					return child.nodeName === "TEMPLATE";
				}
			).innerHTML;

			// Swap the el markup for the empty swiper
			this.$el.innerHTML = template;

			let $swiper = this.$el.querySelector(".swiper");

			const swiper = new Swiper($swiper, {
				init: false,
				loop: true,
				slidesPerView: 1,
				speed: 700,
				grabCursor: true,
				modules: [Manipulation, Navigation],
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
			});

			this.$nextTick(() => {
				let slides = JSON.parse(this.$el.dataset.slides);

				swiper.init();

				slides.forEach((slide, ix) => {
					swiper.addSlide(
						ix,
						`<div class="swiper-slide" x-data='{"slide":${JSON.stringify(
							slide
						)}}'><template x-if="slide">${
							this.slideTemplate
						}</template></div>`
					);
				});

				swiper.slideTo(1);
				swiper.update();
			});
		},
	}));
});
