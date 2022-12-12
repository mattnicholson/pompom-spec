/*

calcFitBox

What size should the child be to fit a given area?

let fitBox = calcFitBox({
	parent : {width:980,height:500},
	child : {width:270,height:370},
	mode : 'cover' // 'cover' or 'contain'
});

can then use fitBox.width , fitBox.height or fitBox.scale as needed

*/

// Object fit util
// Return size properties for a child element based on parent and fit mode (cover ro contain)

const calcFitBox = ({
	parent = { width: 1, height: 1 },
	child = { width: 1, height: 1 },
	mode = "cover",
}) => {
	// Size & aspect of frame (space to fill)
	let aw = parent.width;
	let ah = parent.height;
	let aspect = aw / ah;
	let reverseAspect = ah / aw;

	// Size and aspect of child (object ot fitted)
	let cw = child.width;
	let ch = child.height;
	let childAspect = cw / ch;
	let childReverseAspect = ch / cw;

	if (mode === "cover") {
		// Cover mode
		let setW, setH;
		if (aspect < childAspect) {
			// Frame is more portrait
			// Fit to height
			setH = ah;
			setW = ah * childAspect;
		} else {
			// Frame is more landscape
			// Fit to width
			setW = aw;
			setH = aw * childReverseAspect;
		}

		setW = Math.round(setW);
		setH = Math.round(setH);

		setSize([setW, setH]);
	} else {
		// Contain mode...

		let setW, setH;
		if (aspect > childAspect) {
			// Frame is more landscape
			// Fit to height
			setH = ah;
			setW = ah * childAspect;
		} else {
			// Frame is more portrait
			// Fit to width
			setW = aw;
			setH = aw * childReverseAspect;
		}

		setW = Math.round(setW);
		setH = Math.round(setH);

		return {
			width: setW,
			height: setH,
			scale: setW / child.width,
		};
	}
};

export { calcFitBox };
