import onAnimationFrame from "./onAnimationFrame.js";

const onViewportProgress = (fn, props) => {
	let PROGRESS;
	let [renderLoop, stopRenderLoop] = onAnimationFrame(({ stop }) => {
		if (!props.ref) return;
		let viewPortHeight = window.innerHeight;
		let viewPortWidth = window.innerWidth;
		let viewPortDist = !props.horizontal ? viewPortHeight : viewPortWidth;

		let curPos = props.ref.getBoundingClientRect();

		let h = Math.abs(curPos.top - curPos.bottom);
		let w = Math.abs(curPos.left - curPos.right);

		// Position in viewport
		let pos = !props.horizontal ? curPos.top : curPos.left;

		// How far to travel - default to the viewport plus the height of the object
		let dist = props.distance ? props.distance : viewPortDist;

		// Add the item height to the distance
		if (!props.horizontal) {
			dist = props.hasOwnProperty("ignoreHeight") ? dist : dist + h;
		} else {
			dist = props.hasOwnProperty("ignoreWidth") ? dist : dist + w;
		}
		// Use the objects size as the distance
		if (!props.horizontal) {
			if (props.useHeight) dist = h;
		} else {
			if (props.useWidth) dist = w;
		}

		// Add the viewport to the distance
		dist = props.hasOwnProperty("ignoreViewport")
			? dist - viewPortDist
			: dist;

		// How much to delay the progress start
		let delayPx = props.delay ? props.delay : 0;

		// When to start the progress
		let start = props.hasOwnProperty("start") ? props.start : viewPortDist;

		// Minimum allowed progress
		let minProgress = props.hasOwnProperty("minProgress")
			? props.minProgress
			: 0;

		// Maximum allowed progress
		let maxProgress = props.hasOwnProperty("maxProgress")
			? props.maxProgress
			: 1;

		// How far has it travelled?
		let travelled = start - pos - delayPx;

		let progress = travelled / dist;
		// Scale it up and back again to avoid floating point issues
		progress = Math.round(progress * 100) / 100;

		if (props.reverse) progress = 1 - progress;

		let capProgress = props.hasOwnProperty("capProgress")
			? props.capProgress
			: 1;
		if (capProgress) {
			if (progress > maxProgress) progress = maxProgress;
			if (progress < minProgress) progress = minProgress;
		}

		if (progress == PROGRESS) return;

		PROGRESS = progress;

		if (fn) fn({ progress, pos, travelled, dist });
	});

	return [
		props,
		function () {
			stopRenderLoop();
		},
	];
};

export default onViewportProgress;
