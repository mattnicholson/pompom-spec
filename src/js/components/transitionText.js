import Alpine from "alpinejs";
import gsap from "gsap";

import { init } from "/src/js/utils/alpine";
import { letterize } from "/src/js/utils/dom";

/*

Description:
--------------
Transition from previous property to new value
Value must be a value in the Alpine store

Example Usage:
---------------
<h1 x-data x-transitionText="$store.page.title"></h1>

*/

init(() => {
	Alpine.directive(
		"transitiontext",
		(el, { expression }, { evaluateLater, effect }) => {
			el.style.position = "relative";
			el.style.position = "inline-block";
			el.innerHTML =
				'<span style="white-space:nowrap;" data-ref="a"></span><span style="white-space:nowrap;position:absolute;top:0;left:0;right:0;bottom:0;display:block;" data-ref="b"></span>';
			let curVal = "";
			let prevVal = "";
			let getChangedValue = evaluateLater(expression);

			const render = () => {
				if (prevVal === curVal) return;
				el.querySelector('[data-ref="b"]').innerHTML =
					letterize(prevVal);
				el.querySelector('[data-ref="a"]').innerHTML =
					letterize(curVal);

				// Animate Out
				let outSpans = el.querySelectorAll('[data-ref="b"] span');
				let inSpans = el.querySelectorAll('[data-ref="a"] span');

				gsap.set(inSpans, { display: "inline-block" });
				gsap.set(outSpans, { display: "inline-block" });

				gsap.to(outSpans, {
					duration: 0.3,
					opacity: 0,
					stagger: function (index, target, list) {
						return Math.min(index * 0.04, 0.2);
					},
					y: "-0.1em",
				});

				// Animate in
				gsap.fromTo(
					inSpans,
					{ opacity: 0, y: "0.2em" },
					{
						stagger: function (index, target, list) {
							return Math.min(index * 0.04, 1);
						},
						opacity: 1,
						translateY: 0,
						duration: 0.5,
					}
				);
			};

			effect(() => {
				getChangedValue((value) => {
					prevVal = curVal;
					curVal = value;
					render();
				});
			});
		}
	);
});
