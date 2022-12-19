export const template = `
<template x-if="block">
	<div>
		<div x-data="swiper" :data-slides='JSON.stringify(block.blocks)'>

		    <template>
				<article class="Item Item--hero" :data-color="slide.color" :data-align="slide.align">
					<div class="Item-media">
						<div class="fluid" x-data="parallax" :data-progress="viewportProgress">
							<div class="Image" x-data="image" x-bind="lazy" :data-src="slide.image" data-fit="cover"></div>	
						</div>
					</div>
					<div class="Item-body">
						<h3 x-text="slide.subtitle"></h3>
						<h1 x-text="slide.title"></h1>
						
						<template x-if="slide.body">
							<div x-html="slide.body"></div>
						</template>
						<template x-if="slide.link">
							<nav class="Item-links">
								<a :href="slide.link" x-text="slide.linkText"></div>
							</nav>
						</template>
					</div>
				</article>
			</template>	
			
			<div x-ref="swiper"></div>
		 
		</div>
		
	</div>
</template>`;

const item = ``;
