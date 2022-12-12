function strToArr(str) {
	let out = [];
	for (var i = 0; i < str.length; i++) {
		out.push(str[i].replace(/ /g, "\u00a0"));
	}
	return out;
}

export { strToArr };
