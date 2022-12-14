/*

	Block options:
	---------------
	type: main behaviour
	style: appearance modifer

	align: left/right/centre control
	alignVertical: top/middle/bottom control
	alignText: left/right/centre control
	
	

	Schemas:
	----------------
	- Item
	- Multiple items


*/

export const arr = [
	{
		type: "item",
		alignVertical: "bottom",
		style: "textRight",
		title: "Interview with Karida Collins",
		subtitle: "April 14, 2022",
		image: "/img/pompom-05.jpg",
		body: `<p>Issue 41 marks our 10th birthday and we
have a host of jubilant and celebratory designs which radiate all the joy we feel on this
landmark occasion.</p>`,
		linkText: "Read More",
		link: "#",
	},
	{
		type: "item",
		alignVertical: "middle",
		style: "textLeft",
		title: "New Knits",
		subtitle: "April 14, 2022",
		image: "/img/pompom-03.jpg",
		body: `<p>Issue 41 marks our 10th birthday and we
have a host of jubilant and celebratory designs which radiate all the joy we feel on this
landmark occasion.</p>`,
		linkText: "Read More",
		link: "#",
	},

	{
		type: "carousel",
		blocks: [
			{
				title: "Dream with us this spring",
				image: "/img/pompom-07.jpg",
				body: `<p>Issue 40 Spring 2020 now available</p>`,
				linkText: "Pre-order Now",
				link: "#",
				color: "light",
			},
			{
				title: "New Knits",
				image: "/img/pompom-08.jpg",
				body: `<p>More patterns now available</p>`,
				linkText: "See More",
				link: "#",
				align: "right",
			},
		],
	},
	{
		type: "divider",
		style: "spacer",
	},
	{
		type: "divider",
		style: "rule",
	},
];

export const data = arr
	.concat(arr)
	.concat(arr)
	.concat(arr)
	.concat(arr)
	.concat(arr)
	.concat(arr)
	.concat(arr)
	.concat(arr);
