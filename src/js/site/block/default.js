export const template = `
<template x-if="block">
	<div :class="'Item Item--default Item--'+block.style">
		<div class="Item-media">
			<div class="fluid" x-data="parallax" :data-progress="viewportProgress">
				<div class="Image" x-data="image" x-bind="lazy" :data-src="block.image" data-fit="cover"></div>	
			</div>
		</div>
		<div class="Item-body">

			<h3 x-text="block.subtitle"></h3>
			<h1 x-text="block.title"></h1>
			
			<template x-if="block.body">
				<div x-html="block.body"></div>
			</template>
			<template x-if="block.link">
				<nav class="Item-links">
					<a :href="block.link" x-text="block.linkText"></div>
				</nav>
			</template>
		</div>
	</div>
</template>`;
