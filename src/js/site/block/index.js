import { template as carouselTemplate } from "./carousel.js";
import { template as defaultTemplate } from "./default.js";
import { template as dividerTemplate } from "./divider.js";

const templates = {
	default: { template: defaultTemplate },
	carousel: { template: carouselTemplate },
	divider: { template: dividerTemplate },
};
export default templates;
